import { MongoClient } from 'mongodb';  //Cliente oficial de MongoDB
import * as dotenv from 'dotenv';       //Para cargar variables de entorno desde .env

dotenv.config();

//Interfaz para definir la configuración de cada colección
interface CollectionConfig {
    name: string; //Nombre de la colección
    indexes: any[]; //Índices a crear 
    validation?: any;
}

//Función principal para inicializar la base de datos
export async function initializeDatabase() {
    //Verificar que la URI de MongoDB esté definida
    if (!process.env.MONGODB_URI) {
        throw new Error('❌ MONGODB_URI no está definida en .env');
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
        await client.connect();
        const db = client.db('RedOpsDB');
        
        const collections: CollectionConfig[] = [
            {
                name: 'User',
                indexes: [
                    { key: { id: 1 }, unique: true }, //Índice único para 'id'
                    { key: { username: 1 }, unique: true }, //Índice único para 'username'
                    { key: { email: 1 }, unique: true }, //Índice único para 'email'
                    { key: { enrolled_course_ids: 1 } } //Índice para búsquedas en array
                ],
                validation: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['id', 'name', 'username', 'email', 'password', 'is_admin', 'registration_date'],
                        properties: {
                            id: { bsonType: 'int' }, //PK del usuario
                            name: { bsonType: 'string' }, //Nombre completo
                            username: { bsonType: 'string' }, //Nombre de usuario único
                            email: { bsonType: 'string' }, //Correo electrónico único
                            password: { bsonType: 'string' }, //Contraseña
                            is_admin: { bsonType: 'bool' }, //Rol de admin
                            registration_date: { bsonType: 'string' }, //Fecha de registro
                            enrolled_course_ids: { //Cursos inscritos
                                bsonType: 'array',
                                items: { bsonType: 'int' } //IDs de cursos (FK a Cursos.id)
                            }
                        }
                    }
                }
            },
            {
                name: 'Docentes',
                indexes: [
                    { key: { id: 1 }, unique: true }, //PK del docente
                    { key: { email: 1 }, unique: true } //Email único
                ],
                validation: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['id', 'name', 'email', 'especialidad'],
                        properties: {
                            id: { bsonType: 'int' }, //PK del docente
                            name: { bsonType: 'string' }, //Nombre completo
                            email: { bsonType: 'string' }, //Correo institucional
                            especialidad: { bsonType: 'string' } //Especialidad del docente
                        }
                    }
                }
            },
            {
                name: 'Cursos',
                indexes: [
                    { key: { id: 1 }, unique: true }, //PK del curso
                    { key: { codigo: 1 }, unique: true } //Código único
                ],
                validation: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['id', 'codigo', 'nombre', 'descripcion', 'programa_id', 'docente_id', 'horario_ids'],
                        properties: {
                            id: { bsonType: 'int' }, //PK del curso
                            codigo: { bsonType: 'string' }, //Código identificador único
                            nombre: { bsonType: 'string' }, //Nombre del curso
                            descripcion: { bsonType: 'string' }, //Detalles del contenido
                            programa_id: { bsonType: 'int' }, //FK a ProgramasAcademicos.id
                            docente_id: { bsonType: 'int' }, //FK a Docentes.id
                            horario_ids: { //Horarios asignados
                                bsonType: 'array',
                                items: { bsonType: 'int' } //IDs de Horarios (FK a Horarios.id)
                            }
                        }
                    }
                }
            },
            {
                name: 'Horarios',
                indexes: [
                    { key: { id: 1 }, unique: true } //PK del horario
                ],
                validation: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['id', 'dia', 'hora_inicio', 'hora_fin', 'ubicacion'],
                        properties: {
                            id: { bsonType: 'int' }, //PK del horario
                            dia: { bsonType: 'string' }, //Día de la semana (ej: "Miércoles")
                            hora_inicio: { bsonType: 'string' }, //Hora de inicio (ej: "18:00:00")
                            hora_fin: { bsonType: 'string' }, //Hora de finalización
                            ubicacion: { bsonType: 'string' } //Lugar físico o virtual
                        }
                    }
                }
            },
            {
                name: 'ProgramasAcademicos',
                indexes: [
                    { key: { id: 1 }, unique: true }, //PK del programa
                    { key: { nombre: 1 }, unique: true } //Nombre único (ej: "Ingeniería de Sistemas")
                ],
                validation: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['id', 'nombre', 'descripcion'],
                        properties: {
                            id: { bsonType: 'int' }, //PK del programa
                            nombre: { bsonType: 'string' }, //Nombre del programa
                            descripcion: { bsonType: 'string' } //Objetivos y enfoque
                        }
                    }
                }
            }
        ];

        //Crear colecciones y aplicar configuraciones
        for (const collectionConfig of collections) {
            const existingCollections = await db.listCollections({ name: collectionConfig.name }).toArray();
            
            //Crear colección si no existe
            if (existingCollections.length === 0) {
                await db.createCollection(collectionConfig.name, {
                    validator: collectionConfig.validation
                });
                console.log(`✅ Colección ${collectionConfig.name} creada`);
            }

            //Crear índices definidos
            for (const indexConfig of collectionConfig.indexes) {
                await db.collection(collectionConfig.name).createIndex(indexConfig.key, {
                    unique: indexConfig.unique || false  // Índice único o no
                });
            }
        }

        console.log('✅ Base de datos inicializada correctamente');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        throw error;
    } finally {
        await client.close();  // Cerrar conexión
    }
}

if (require.main === module) {
    initializeDatabase().catch(() => process.exit(1));
}
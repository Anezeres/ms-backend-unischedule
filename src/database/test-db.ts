import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error('❌ MONGODB_URI no está definida en .env');
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
        await client.connect();
        const db = client.db('RedOpsDB');

        // ===== 1. Insertar Programa Académico =====
        const programa = {
            id: 1,
            nombre: "Ingeniería de Sistemas",
            descripcion: "Programa académico enfocado en desarrollo de software y arquitectura computacional."
        };
        await db.collection('ProgramasAcademicos').insertOne(programa);
        console.log('✅ Programa académico insertado');

        // ===== 2. Insertar Docente =====
        const docente = {
            id: 1,
            name: "Dr. Luis Gómez",
            email: "luis.gomez@universidad.edu.co",
            especialidad: "Inteligencia Artificial"
        };
        await db.collection('Docentes').insertOne(docente);
        console.log('✅ Docente insertado');

        // ===== 3. Insertar Horarios =====
        const horario = {
            id: 1,
            dia: "Miércoles",
            hora_inicio: "18:00:00",
            hora_fin: "21:00:00",
            ubicacion: "Edif. B13 (B13) -> SALA 5 - MG - MELÉNDEZ"
        };
        await db.collection('Horarios').insertOne(horario);
        console.log('✅ Horario insertado');

        // ===== 4. Insertar Curso =====
        const curso = {
            id: 1,
            codigo: "/580801C",
            nombre: "Sistemas Operativos",
            descripcion: "Curso sobre administración de sistemas operativos y manejo de procesos.",
            programa_id: 1, //Relación con Programa Académico
            docente_id: 1, //Relación con Docente
            horario_ids: [1] //Relación con Horarios
        };
        await db.collection('Cursos').insertOne(curso);
        console.log('✅ Curso insertado');

        // ===== 5. Insertar Usuario =====
        const usuario = {
            id: 1,
            name: "Juan Pérez",
            username: "juanp",
            email: "juan.perez@correo.com",
            password: "hashed_password",
            is_admin: false,
            registration_date: "2024-03-08T10:15:30Z",
            enrolled_course_ids: [1] //Relación con Cursos
        };
        await db.collection('User').insertOne(usuario);
        console.log('✅ Usuario insertado');

        console.log('🎉 Datos de prueba insertados correctamente');
    } catch (error) {
        console.error('❌ Error durante la inserción:', error);
    } finally {
        await client.close();
    }
}

if (require.main === module) {
    seedDatabase().catch(() => process.exit(1));
}
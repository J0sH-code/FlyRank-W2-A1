import dbClient from "../config/db.js";

export default async function initializeTable(){
    const createTaskTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50),
            done BOOLEAN
        )
    `
    try {
        dbClient.query(createTaskTableQuery)
        console.log('Users table checked/created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
    
}
import dbClient from "../config/db.js"
export default class TaskRepo {
    constructor(){
    }

    #tasks = [
        {id: 1, title: "Note1", done:true},
        {id: 2, title: "Note2", done:true},
        {id: 3, title: "Note3", done:true}
    ]

    async getAllTasks(){
        try {
            const { rows } = await dbClient.query(`SELECT * FROM tasks;`);
            console.log('All tasks: ', rows);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
        }
    }

    async findById(id){
        const findTaskByIdQuery = `SELECT * FROM tasks WHERE id = $1;`
        const values = [id]

        try {
            const { rows } = await dbClient.query(findTaskByIdQuery, values)
            console.log(rows);
            
            return rows[0]  
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    }

    async add(task){
        const newTaskQuery = `
                INSERT INTO tasks (title, done)
                VALUES ($1, $2)
                RETURNING *;
            `
        const values = [task.title, task.done] 
        try {
            const { rows } = await dbClient.query(newTaskQuery, values)
            return rows[0]
        } catch (error) {
            console.error('Error inserting task:', error);
        }
    }

    async updateTitle(id, newTitle){
        const updateTitleQuery = `
            UPDATE tasks
            SET 
                title = $1
            WHERE id = $2
            RETURNING *;
        `
        const values = [newTitle, id]
        try {
            const { rows } = await dbClient.query(updateTitleQuery, values)
            return rows
        } catch (error) {
            console.error('Error updating title:', error);
        }
    }

    async updateStatus(id, newStatus){
        const updateStatusQuery = `
            UPDATE tasks
            SET 
                done = $1
            WHERE id = $2
            RETURNING *;
        `
        const values = [newStatus, id]
        console.log(newStatus);
        
        try {
            const { rows } = await dbClient.query(updateStatusQuery, values)
            console.log(rows[0]);
            
            return rows
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    async deleteTask(id){
        try {
            await dbClient.query(`
                    DELETE FROM tasks
                    WHERE id = $1;
                `, [id])
        } catch (error) {
            console.error('Error in deleting task:', error);
        }
    }
}
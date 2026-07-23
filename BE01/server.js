import express, { json } from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { readFile } from 'node:fs/promises';

const app = express()
const port = 3000
const swaggerDocument = await readFile('./openapi.json', {encoding: 'utf8'})

app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)))


app.get("/", (req, res) => {
    res.status(200).json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    })
})

app.get("/health", (req, res) => {
    
})

app.get("/tasks", (req, res) => {
    
})

app.get("/tasks/:id", (req, res) => {
    
})

app.post("/tasks", (req, res) => {
    const taskTitle = req.body.title;
    let newId = tasks[tasks.length-1].id + 1

    if (taskTitle == null) {
        res.status(400).json({
            error: `Title missing`
        })
    }

    tasks.push({
        id: newId,
        title: taskTitle,
        done: false
    })

    res.status(200).json({
        created: true,
        task: tasks.find(task => task.id == newId)
    })
})

app.put("/tasks/:id", (req, res) => {
    if (req.body == null || (req.body.title == null && req.body.done == null)) {
        res.status(400).json({
            error: "Invalid/missing request body"
        })
    }

    const requestedTask = tasks.find(task => task.id == req.params.id)
    if (requestedTask == null) {
        res.status(404).json({
            error: `Task ${req.params.id} not found`
        })
    }

    requestedTask.done = req.body.done;
    requestedTask.title = req.body.title;

    res.status(201).send(requestedTask)
})

app.delete("/tasks/:id", (req, res) => {
    const requestedTask = tasks.find(task => task.id == req.params.id)
    if (requestedTask == null) {
        res.status(404).json({
            error: `Task ${req.params.id} not found`
        })
    }

    tasks.splice(tasks.indexOf(requestedTask),1)
    res.sendStatus(204)
})

app.listen(port,() => {
    console.log(`Listening to ${port}`)
})
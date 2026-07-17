import express from "express";

const app = express()
const port = 3000

const tasks = [
    {id: 123, title: "Note1", done:true},
    {id: 234, title: "Note2", done:true},
    {id: 345, title: "Note3", done:true}
]

app.get("/", (req, res) => {
    res.status(200).json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

app.get("/tasks", (req, res) => {
    res.status(200).send(tasks)
})

app.get("/tasks/:id", (req, res) => {
    const requestedTask = tasks.find(task => task.id == req.params.id)
    if (requestedTask == null) {
        res.status(404).json({
            error: `Task ${req.params.id} not found`
        })
    }
    res.status(200).send(requestedTask)
})

app.listen(port,() => {
    console.log(`Listening to ${port}`)
})
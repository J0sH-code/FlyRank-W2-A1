import express from "express"
import TaskService from "../services/TaskService.js";

const taskRouter = express.Router()
const taskService = new TaskService()

taskRouter.get("/tasks", async (req, res) => {
    res.status(200).json(await taskService.getTasks())
})

taskRouter.get("/tasks/:id", async (req, res, next) => {
    try {
        res.status(200).json(await taskService.getTask(req.params.id))
    } catch (error) {
        next(error)
    }
})

taskRouter.post("/tasks", async (req, res, next) => {
    try {
        res.status(201).json({
            created: true,
            task: await taskService.createTask(req.body.title)
        })
    } catch (error) {
         next(error)
    }
})

taskRouter.put("/tasks/:id", async (req, res, next) => {
    try {
        res.status(201).json(await taskService.updateTask(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

taskRouter.delete("/tasks/:id", async (req, res, next) => {
    try {
        taskService.deleteTask(await req.params.id)
        res.sendStatus(204)
    } catch (error) {
         next(error)
    }
})

export default taskRouter
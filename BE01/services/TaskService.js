import { NotFoundError, ValidationError } from "../errors.js";
import TaskRepo from "../repositories/TasksRepo.js";

export default class TaskService {
    #taskRepo = new TaskRepo()
    
    getTasks(){
        return this.#taskRepo.getAllTasks()
    }

    getTask(id){
        if (id == null) {
            throw new ValidationError('Invalid/missing id')
        }

        const requestedTask = this.#taskRepo.findById(id)
        if (requestedTask == null) {
            throw new NotFoundError(`Task ${id} not found`);
        }
        return requestedTask

    }

    createTask(title){
        if (title == null) {
            throw new ValidationError("Title Missing");
        }

        let newTask = {
            title: title,
            done: false
        }

        return this.#taskRepo.add(newTask)
    }

    updateTask(id, payload){
        if (payload == null || (payload.title == null && payload.done== null)) {
            throw new ValidationError("Invalid/missing request body");
        }

        let requestedTask = this.getTask(id)
        if (requestedTask == null) {
            throw new NotFoundError(`Task ${id} not found`);
            
        }
        
        this.#taskRepo.updateTitle(id, payload.title)
        this.#taskRepo.updateStatus(id, payload.done)

        return this.getTask(id)
    }

    deleteTask(id){
        if (id == null) {
            throw new ValidationError('Invalid/missing id')
        }

        let requestedTask = this.getTask(id)
        if (requestedTask == null) {
            throw new NotFoundError(`Task ${id} not found`);
        }

        this.#taskRepo.deleteTask(id)
    }
}
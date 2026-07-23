export default class TaskRepo {
    constructor(){

    }

    #tasks = [
        {id: 1, title: "Note1", done:true},
        {id: 2, title: "Note2", done:true},
        {id: 3, title: "Note3", done:true}
    ]

    getAllTasks(){
        return #tasks
    }

    findById(id){
        return this.#tasks.find(tasks => tasks.id === id)
    }

    add(task){
        this.#tasks.push(task)
    }

    updateTitle(id, newTitle){
        this.findById(id).title = newTitle
    }

    updateStatus(id, newStatus){
        this.findById(id).done = newStatus
    }

    deleteTask(task){
        this.#tasks.splice(this.tasks.indexOf(task),1)
    }
}
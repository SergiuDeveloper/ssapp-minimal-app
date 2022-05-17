const TO_DO_TABLE = "todos";

class TodoManagerService {

    constructor(enclaveDB) {
        this.enclave = enclaveDB;
    }

    createToDo(todo, callback) {
        this.enclave.insertRecord(TO_DO_TABLE, todo.input.name, todo, callback);
    }

    removeToDo(todo, callback) {
        this.enclave.deleteRecord(TO_DO_TABLE, todo.input.name, callback);
    }

    editToDo(todo, callback) {
        this.enclave.updateRecord(TO_DO_TABLE, todo.input.name, todo, callback);
    }

    listToDos(callback) {
        this.enclave.getAllRecords(TO_DO_TABLE, callback);
    }

    listFilteredToDos(sort, limit, callback) {
        this.enclave.filter(TO_DO_TABLE, undefined, sort, limit, callback);
    }

    beginBatch() {
        this.enclave.beginBatch();
    }

    commitBatch(callback) {
        this.enclave.commitBatch(callback);
    }
}

let todoManagerService;
let getTodoManagerServiceInstance = function(controllerInstance, callback) {
    if (!todoManagerService) {
        controllerInstance.getMainEnclaveDB((err, enclave) => {
            if (err) {
                console.log('Could not get main enclave ', err);
                return callback(err);
            }
            todoManagerService = new TodoManagerService(enclave);
            return callback(todoManagerService)
        })

    } else {
        return callback(todoManagerService);
    }
}

export {
    getTodoManagerServiceInstance
};
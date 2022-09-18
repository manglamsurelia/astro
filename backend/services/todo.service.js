const sql = require('../db');

// service for create repo. 
exports.createRepoService = async (data) => {
    try {
        var query = `INSERT INTO todo (done,description,dueDate,priority,assignTo,assignBy,assignToId) VALUES (false,"${data.description}","${data.dueDate}","${data.priority}","${data.assignTo}",${data.assignBy},${data.assignToId})`;
        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully inserted'
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for update repo. 
exports.updateRepoService = async (data) => {
    console.log(data)
    try {
        var query = `UPDATE todo
                     SET done = ${data.done}
                     WHERE todoId = ${data.id}`;

        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully updated'
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for update todo. 
exports.updateTodoService = async (data) => {
    console.log(data)
    try {
        var query = `UPDATE todo
                     SET description = "${data.description}" ,dueDate = "${data.dueDate}",priority="${data.priority}",assignTo="${data.assignTo}",assignToId = ${data.assignToId}
                     WHERE todoId = ${data.id}`;

        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully updated'
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for show repo. 
exports.showRepoService = async (data) => {
    try {
        var query;
        if (data.role == 'admin') {
            query = `SELECT * FROM todo`
        }
        else {
            query = `SELECT * FROM todo WHERE assignBy=${data.parentId} OR assignToId=${data.parentId}`
        }
        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully retrieve',
                data: result
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

// service for show repo of user. 
exports.showUserRepoService = async (data) => {
    try {
        var query = `SELECT * FROM repo_details WHERE posted_by="${data}"`
        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully retrieve',
                data: result
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};


// service for delete repo. 
exports.deleteRepoService = async (data) => {
    try {
        var query = `DELETE FROM todo WHERE id=${data}`
        const result = await sql.query(query)

        if (result) {
            return {
                sucess: true,
                message: 'successfully deleted',
            }
        }
    } catch (e) {
        return {
            sucess: false,
            message: 'something went wrong'
        }
    }
};

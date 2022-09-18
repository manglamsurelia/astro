const repoService = require('../services/todo.service')

// controller for create Repository
exports.createRepository = async (req, res) => {
    try {
        const { parentId } = req.jwt;
        const body = req.body;
        body.assignBy = parentId;
        // body.date = now();
        const data = await repoService.createRepoService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for update Repository
exports.updateRepository = async (req, res) => {
    try {
        const body = req.body;
        // body.date = now();
        const data = await repoService.updateRepoService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for update todo
exports.updateTodo = async (req, res) => {
    try {
        const body = req.body;
        // body.date = now();
        const data = await repoService.updateTodoService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for show all list Repository
exports.showRepository = async (req, res) => {
    try {
        // console.log(req.jwt)
        const data = await repoService.showRepoService(req.jwt);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

// controller for show specific user list Repository
// exports.showSpecificRepository = async (req, res) => {
//     try {
//         const {email} = req.jwt
//         const data = await repoService.showUserRepoService(email);
//         if (data.sucess == true) {
//             res.status(200).json(data)
//         }
//         else {
//             res.status(404).json(data)
//         }
//     }
//     catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error,
//         });
//     }

// }


// controller for delete list of Repository
exports.deleteRepository = async (req, res) => {
    try {
        let id = req.params.id
     
        const data = await repoService.deleteRepoService(id);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json(data)
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }

}

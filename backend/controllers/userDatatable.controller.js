const userTableService = require('../services/userDatatable.service');

exports.createUserTable = async (req, res) => {
    try {
        const body = req.body;
        const data = await userTableService.createUserDataService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        } else {
            res.status(400).josn({
                message: 'erorr'
            })
        }

    } catch (error) {
        res.status(404).json({
            sucess: false,
            message: error
        })
    }
}

exports.updateUserTable = async(req,res)=>{
    try {
        const id= req.params.id;
        const body = req.body;
        const data = await userTableService.updateUserDataService(body, id);
        if(data.sucess== true){
            res.status(200).json(data)
        }else{
            res.status(400).json({
                sucess:false,
                message:error
            })
        }
    } catch (error) {
        res.status(404).json({
            message:error
        })
    }
}

exports.deleteUserTable = async(req,res)=>{
    try {
        var id= req.params.id;
        const data = await userTableService.deleteUserDataService(id);
        if(data.sucess == true){
            res.status(200).json(data)
        }else{
            res.status(400).json({
                sucess:false,
                message:error
            })
        }
    } catch (error) {
        res.status(404).josn({
            sucess:false,
            message:error
        })
    }
}

exports.showUserTable = async(req,res)=>{
    try {
        const data= await userTableService.showUserDataService(req.jwt);
        if(data.sucess == true){
            res.status(200).json(data);
        }else{
            res.status(400).json({
                sucess:false,
                message:error
            })
        }
    } catch (error) {
        res.status(404).json({
            sucess:false,
            message:error
        })
    }
}
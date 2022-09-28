const clientService = require('../services/clientTracking.service');

exports.createClient = async (req, res) => {
    try {
        const body = req.body;
        const data = await clientService.createClientService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json({
                message: 'errorrr'
            });
        }

    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error
        })
    }
}
exports.updateClient = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await clientService.updateClientService(body,id);
        if (data.sucess == true) {
            res.status(200).json(data)
        }
        else {
            res.status(404).json({
                message: 'error'

            })
        }

    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error
        })
    }
}
exports.deleteClient = async(req, res) => {
    try {
        let id = req.params.id
        const data = await clientService.deleteClient(id);
        if (data.sucess == true) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({
                sucess:false,
                message:error
            })
        }
    } catch (error) {
        return res.status(400).json({
            sucess:false,
            message:error
        })
    }
}
exports.showClients = async(req,res) => {
try {
    const data = await clientService.showClients(req.jwt);
    if(data.sucess == true){
        return res.status(200).json(data);
    }
    else{
        return res.status(404).json(data);
    }
} catch (error) {
    return res.status(400).json({
        sucess:false,
        message:error
    })
}
}
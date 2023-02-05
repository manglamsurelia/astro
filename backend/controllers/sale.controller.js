const saleService = require('../services/sale.service');

exports.createCustomer = async (req, res) => {
    try {
        const { id } = req.jwt;
        const body = req.body;
        body.assignBy = id;
        body.invoice = parseInt(`${id}`+`${body.invoice}`)
        const data = await saleService.createCustomerService(body);
        if (data.sucess == true) {
            res.status(200).json(data)
        } else {
            res.status(400).josn({
                message: 'error'
            })
        }

    } catch (error) {
        res.status(404).json({
            sucess: false,
            message: error
        })
    }
}

exports.updateCustomer = async(req,res)=>{
    try {
        const id= req.params.id;
        const body = req.body;
        const data = await saleService.updateCustomerService(body, id);
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

exports.deleteCustomer = async(req,res)=>{
    try {
        var id= req.params.id;
        const data = await saleService.deleteCustomerService(id);
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

exports.showCustomers = async(req,res)=>{
    try {
        const data= await saleService.showCustomerService(req.jwt);
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
const e = require('express');
const sql = require('../db');

exports.createClientService = async(data)=>{
    try {
        var query =`INSERT INTO clienttracking (clientName,clientPhone,clientEmail,estimatedSale,lastContact,nextAction,nextContact,leadStatus,leadSource,notes,currency) VALUES ("${data.clientName}","${data.clientPhone}","${data.clientEmail}",${data.estimatedSale},"${data.lastContact}","${data.nextAction}","${data.nextContact}","${data.leadStatus}","${data.leadSource}","${data.notes}","${data.currency}")`;
        const result = await sql.query(query);
        if (result) {
            return {
                sucess: true,
                message: 'successfully inserted'
            }
        }
    } catch (e) {
        return {
            sucess:false,
            message:'something went wrong'
        }
    }
}
exports.updateClientService = async (data, id)=>{
    try {
        var query = `UPDATE clienttracking 
                    SET clientName="${data.clientName}", clientPhone="${data.clientPhone}", clientEmail="${data.clientEmail}", estimatedSale=${data.estimatedSale}, clientName="${data.clientName}", lastContact="${data.lastContact}", nextAction="${data.nextAction}",  nextContact="${data.nextContact}",  leadStatus="${data.leadStatus}",  leadSource="${data.leadSource}",  notes="${data.notes}", currency="${data.currency}"
                    WHERE clientId = ${id}`
        const result =await sql.query(query);
        if(result){
            return {
                sucess: true,
                message: 'successfully updated'
            }
        }
                    
    } catch (error) {
        return {
            sucess:false,
            message:error
        }
    }
}

exports.deleteClient = async (data)=>{
    try {
       var query = `DELETE FROM clienttracking WHERE clientId=${data}`;
        const result = await sql.query(query)
        if(result){
            return{
                sucess:true,
                message:'sucessfully deleted'
            }
        }
    } catch (error) {
        return {
            sucess:false,
            message:'something went wrong'
        }
    }
}

exports.showClients = async(data)=>{
 try {

    var query = `SELECT * FROM clienttracking`;
    const result = await sql.query(query);
    if(result){
        return{
            sucess:true,
            message:'successfully retrieve',
            data:result
        }
    }
 } catch (error) {
    return{
        sucess:false,
        message:'something wrong'
    }
 }   
}
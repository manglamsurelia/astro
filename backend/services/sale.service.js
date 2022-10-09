const sql = require('../db');

exports.createCustomerService= async(data)=>{
    try {   
            var query =`INSERT INTO saleslog (date_of_sale,customer_name,currency,amount,item,invoice,address,notes) VALUES ("${data.date_of_sale}","${data.customer_name}","${data.currency}","${data.amount}","${data.item}","${data.invoice}","${data.address}","${data.notes}")`;
            const result = await sql.query(query);
            if(result){
                return {
                    sucess:true,
                    message:'successfully Inserted'
                }
            }

    } catch (error) {
        return {
            sucess:false,
            message:'some thing went wrong'
        }
    }

}

exports.updateCustomerService = async(data, id)=>{
    try {
         var query=`UPDATE saleslog SET date_of_sale="${data.date_of_sale}", customer_name="${data.customer_name}",currency="${data.currency}",amount="${data.amount}", item= "${data.item}", invoice="${data.invoice}", address="${data.address}", notes="${data.notes}"
            WHERE sale_id =${id}`;
        const result = await sql.query(query);
        if(result){
            return {
                sucess:true, 
                message:'updated sucessfully'
            }
        }
    } catch (error) {
        return {
            sucess:false,
            message:'some thing went wrong'
        }
    }

}

exports.deleteCustomerService = async(id)=>{
    try {
        var query = `DELETE from saleslog WHERE sale_id = ${id}`;
        const result = await sql.query(query);
        if(result){
            return {
                sucess:true,
                message:'successfully deleted'
            }
        }
    } catch (error) {
        return {
            sucess:false,
            message:'some thing went wrong'
        }
    }
}

exports.showCustomerService = async()=>{
    try {
        var query = `SELECT * FROM saleslog`;
        const result = await sql.query(query);
        if(result){
            return {
                sucess:true,
                message:'successfully retrieve',
                data:result
            }
        }
    } catch (error) {
        return {
            sucess:false,
            message:'some thing went wrong'
        }
    }
}
const sql = require('../db');

exports.createCustomerService = async (data) => {
    console.log(data)
    try {
        var query = `INSERT INTO saleslog (date_of_sale,customer_name,currency,amount,item,invoice,address,notes,assignBy) VALUES ("${data.date_of_sale}","${data.customer_name}","${data.currency}","${data.amount}","${data.item}","${data.invoice}","${data.address}","${data.notes}",${data.assignBy})`;
        console.log(query)
        const result = await sql.query(query);
        if (result) {
            return {
                sucess: true,
                message: 'successfully Inserted'
            }
        }

    } catch (error) {
        return {
            sucess: false,
            message: 'some thing went wrong'
        }
    }

}

exports.updateCustomerService = async (data, id) => {
    try {
        var query = `UPDATE saleslog SET date_of_sale="${data.date_of_sale}", customer_name="${data.customer_name}",currency="${data.currency}",amount="${data.amount}", item= "${data.item}", invoice="${data.invoice}", address="${data.address}", notes="${data.notes}"
            WHERE sale_id =${id}`;
        const result = await sql.query(query);
        if (result) {
            return {
                sucess: true,
                message: 'updated sucessfully'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: 'some thing went wrong'
        }
    }

}

exports.deleteCustomerService = async (id) => {
    try {
        var query = `DELETE from saleslog WHERE sale_id = ${id}`;
        const result = await sql.query(query);
        if (result) {
            return {
                sucess: true,
                message: 'successfully deleted'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: 'some thing went wrong'
        }
    }
}

exports.showCustomerService = async (data) => {
    try {
        var query = `SELECT * FROM saleslog WHERE assignBy=${data.id}`;
        const result = await sql.query(query);
        if (result) {
            return {
                sucess: true,
                message: 'successfully retrieve',
                data: result
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: 'some thing went wrong'
        }
    }
}
// MONTH( date_of_sale) = 1 and YEAR( date_of_sale) = 2023  GROUP BY item`;
exports.showAnalyticsService = async (data,start,end) => {
    try {
        var query = `SELECT item,amount,date_of_sale FROM saleslog WHERE assignBy=${data.id} and 
        date_of_sale >='${start}' AND date_of_sale <= '${end}'
        `
        const result = await sql.query(query);

        let obj = {}
        result.filter((res) => {
            if (!obj.hasOwnProperty(res.date_of_sale)) {
                obj[res.date_of_sale] = {}
            }
            if (!obj[res.date_of_sale].hasOwnProperty(res.item)) {
                obj[res.date_of_sale][res.item] = []
            }

            if (obj[res.date_of_sale][res.item]) {
                obj[res.date_of_sale][res.item] = res.amount
            }
        })

        // let res1 = Object.keys(obj)
        // let newResult = [];
        // for (let i = 0; i < res1.length; i++) {
        //     newResult.push(obj[res1[i]])
        // }


        if (result) {
            return {
                sucess: true,
                message: 'successfully retrieve',
                data: obj
            }
        }
    } catch (error) {
        return {
            sucess: false,
            message: 'some thing went wrong'
        }
    }
}
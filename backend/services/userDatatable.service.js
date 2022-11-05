const sql= require('../db');
exports.createUserDataService= async(data)=>{
    try {   
            var query =`INSERT INTO userdatabasetable (category,subCategory,boy_Name,boy_dob,boy_birthPlace,boy_birthTime,girl_Name,girl_dob,girl_birthPlace,girl_birthTime,native_question,comment,name,dob,birthPlace,birthTime,astrologer_comment) VALUES ("${data.category}","${data.subCategory}","${data.boy_Name}","${data.boy_dob}","${data.boy_birthPlace}","${data.boy_birthTime}","${data.girl_Name}","${data.girl_dob}","${data.girl_birthPlace}","${data.girl_birthTime}","${data.native_question}","${data.comment}","${data.name}","${data.dob}","${data.birthPlace}","${data.birthTime}","${data.astrologer_comment}")`;
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

exports.updateUserDataService = async(data, id)=>{
    try {
         var query=`UPDATE userdatabasetable SET category="${data.category}",subCategory="${data.subCategory}", boy_Name="${data.boy_Name}",boy_dob="${data.boy_dob}",boy_birthPlace="${data.boy_birthPlace}", boy_birthTime= "${data.boy_birthTime}", girl_Name="${data.girl_Name}", girl_dob="${data.girl_dob}", girl_birthPlace="${data.girl_birthPlace}",girl_birthTime="${data.girl_birthTime}",native_question="${data.native_question}",comment="${data.comment}",name="${data.name}", dob="${data.dob}",birthPlace="${data.birthPlace}",birthTime="${data.birthTime}",astrologer_comment="${data.astrologer_comment}"
            WHERE user_id  =${id}`;
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

exports.deleteUserDataService = async(id)=>{
    try {
        var query = `DELETE from userdatabasetable WHERE user_id  = ${id}`;
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

exports.showUserDataService = async()=>{
    try {
        var query = `SELECT * FROM userdatabasetable`;
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
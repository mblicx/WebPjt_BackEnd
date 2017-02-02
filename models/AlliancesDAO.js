const DB = require('../models/Database');

module.exports = {
    getById(id) {
        return DB.query(
            'select * from alliances where id = ${allianceID}',
            {allianceID: id}
        )
        .then((result) =>{
            if (result.length ===0) {
                throw 'USER NOT_FOUND';
            }
            return result[0]
        })
        
    },

    getAll(){
        return DB.query('select * from alliances')
        .then((result)=>{
            return result;
        })
        .catch((error)=>{
            throw error;
        })
    },

    createUser(){
        return 'temp';
    }

};
const DB = require('../models/Database');

module.exports = {
    getById(id) {
        return DB.query(
            'select * from characters where id = ${characterID}',
            {characterID: id}
        )
        .then((result) =>{
            if (result.length ===0) {
                throw 'character NOT_FOUND';
            }
            return result[0]
        })
        
    },

    getAll(){
        return DB.query('select * from characters')
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
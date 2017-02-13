const DB = require('../models/Database');

module.exports = {
    getById(id) {
        return DB.accessor.query(
            'select * from users where id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'USER NOT_FOUND';
                }
                return result[0]
            })

    },

    getAll() {
        return DB.accessor.query('select * from users')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    getCharacters(id) {
        return DB.accessor.query(
            'SELECT * from characters WHERE user_id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                return result;
            })
    },

    create(username, email, alliance) {
        return DB.accessor.query(
            'insert into users(name,email,alliance_id) values(${userName},${mail},${alliance_id}) returning *',
            {
                userName: username,
                mail: email,
                alliance_id: alliance
            })
            .then((result) => {
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
    },

    deleteById(id) {

        return DB.accessor.query(
            'delete from users where id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    updateById(id, username, email, alliance) {
           return DB.accessor.query(
                    'update users set name=${userName},email=${mail},alliance_id=${userAlliance} where id=${userID};select * from users where id = ${userID}',
                    {
                        userID: id,
                        userName: username,
                        mail: email,
                        userAlliance: alliance
                    })
                    .then((result) => {
                        return result;
                    })
                    .catch((error) => {
                        throw error;
                    })

            
    }
};
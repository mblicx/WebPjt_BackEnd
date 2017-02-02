const DB = require('../models/Database');

module.exports = {
    getById(id) {
        return DB.query(
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
        return DB.query('select * from users')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    create(username, email) {
        return DB.query(
            'insert into users(name,email) values(${userName},${mail}) returning *',
            {
                userName: username,
                mail: email
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    deleteById(id) {
        return DB.query(
            'select * from users where id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'USER NOT_FOUND';
                    DB.query(
                        'delete from users where id = ${userID}',
                        { userID: id }
                    )
                        .then((result) => {
                            if (result.length === 0) {
                                return 'Delete Success!';
                            }
                        })
                        .catch((error) => {
                            throw error;
                        })
                }
            })
    },

    updateById(id, username, email, alliance) {
        return DB.query(
            'select * from users where id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'USER NOT_FOUND';
                    DB.query(
                        'update users set name=${userName},email=${mail},alliance_id=${userAlliance} where id=${userID}',
                        {
                            userID: id,
                            userName: username,
                            mail: email,
                            userAlliance: alliance
                        })
                        .then((result) => {
                            return 'Update Success!';
                        })
                        .catch((error) => {
                            throw error;
                        })
                }
            })


    }
};
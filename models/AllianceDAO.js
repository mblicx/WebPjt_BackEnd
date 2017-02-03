const DB = require('../models/Database');

module.exports = {

    getById(id) {
        return DB.query(
            'SELECT * FROM alliances WHERE id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result[0]
            })
    },


    getAll() {
        return DB.query('SELECT * FROM alliances')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    create(alliancename) {
        return DB.query(
            'INSERT INTO alliances(name) VALUES(${allianceName}) RETURNING *',
            {
                allianceName: alliancename
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

    }



};
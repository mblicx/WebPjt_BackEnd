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
    getUsersById(id) {
        return DB.query(
            'SELECT * FROM users WHERE alliance_id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result;
            })
    },
    getCharactersById(id) {
        return DB.query(
            'SELECT * FROM users cross join characters WHERE users.id = characters.user_id and alliance_id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result;
            })
    },
    getCharactersByIdAndClass(id, chaclass) {
        return DB.query(
            'SELECT * FROM users cross join characters WHERE users.id = characters.user_id and alliance_id = ${allianceID} and  class = ${Chaclass}',
            {
                allianceID: id,
                Chaclass: chaclass
            }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result;
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
    },

    deleteById(id) {
        return DB.query(
            'select * from alliances where id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                DB.query(
                    'delete from alliances where id = ${allianceID}',
                    { allianceID: id }
                )
                    .then((result) => {
                        if (result.length === 0) {
                            return 'Delete Success!';
                        }
                    })
                    .catch((error) => {
                        throw error;
                    })

            })
    },

    updateById(id, name) {
        return DB.query(
            'select * from alliances where id = ${allianceID}',
            { allianceID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'ALLIANCE NOT_FOUND';
                }
                DB.query(
                    'update alliances set name=${allianceName} where id=${allianceID}',
                    {
                        allianceID: id,
                        allianceName: name
                    })
                    .then((result) => {
                        return 'Update Success!';
                    })
                    .catch((error) => {
                        throw error;
                    })
            })
    }


};
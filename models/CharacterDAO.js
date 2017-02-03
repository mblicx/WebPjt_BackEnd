const DB = require('../models/Database');

module.exports = {

    getById(id) {
        return DB.query(
            'SELECT * FROM characters WHERE id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'CHARACTER NOT_FOUND';
                }
                return result[0]
            })
    },


    getAll() {
        return DB.query('SELECT * FROM characters')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    getByClass(chaclass) {
        return DB.query(
            'select * from characters where class = ${characterClass}',
            {
                characterClass: chaclass
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

    },

// result 获取 坐标进行计算
    getInDistenceEnnemies(id, subrad) {
        var x = 0;
        var y = 0;
        DB.query(
            'select position from characters where id = ${charId};',
            {
                charId: id
            }
        )
            .then((result) => {
                //x = ;
                console.log(result[0]);
            })
            .catch((error) => {
                throw error;
            })

        return DB.query(
            'select characters.*,alliance_id from characters cross join users where characters.user_id=users.id and alliance_id <> (select users.alliance_id from characters cross join users where characters.user_id = users.id and characters.id =  ${charId});',
            {
                charId: id
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

    },
// result 获取 坐标进行计算
    getInDistenceAlliance(id, subrad) {
        var x = 0;
        var y = 0;
        DB.query(
            'select position from characters where id = ${charId};',
            {
                charId: id
            }
        )
            .then((result) => {
                //x = ;
                console.log(result[0]);
            })
            .catch((error) => {
                throw error;
            })

        return DB.query(
            'select characters.*,alliance_id from characters cross join users where characters.user_id=users.id and characters.id <> ${charId} and alliance_id= (select users.alliance_id from characters cross join users where characters.user_id = users.id and characters.id = ${charId});',
            {
                charId: id
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })

    },
    create(name, chaclass, user_id, point) {
        return DB.query(
            'INSERT INTO characters(name,class,user_id,position) VALUES(${Name},${Class},${User_id},${Position}) RETURNING *',
            {
                Name: name,
                Class: chaclass,
                User_id: user_id,
                Position: point
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
            'select * from characters where id = ${characterID}',
            { characterID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'CHARACTER NOT_FOUND';
                }
                DB.query(
                    'delete from characters where id = ${characterID}',
                    { characterID: id }
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

    updateById(id, name, user_id, chaclass, position) {
        return DB.query(
            'select * from characters where id = ${characterID}',
            { characterID: id }
        )
            .then((result) => {
                if (result.length === 0) {
                    throw 'CHARACTER NOT_FOUND';
                }
                DB.query(
                    'update characters set name=${characterName}, user_id=${userID},class=${cclass},position=${point} where id=${characterID}',
                    {
                        characterID: id,
                        characterName: name,
                        userID: user_id,
                        cclass: chaclass,
                        point: position
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
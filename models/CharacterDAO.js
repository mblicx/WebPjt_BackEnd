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
    getInDistenceEnnemies(id, radius) {
        var lat1 = 0;
        var lng1 = 0;
        var ennemies = new Array();
        DB.query(
            'select position from characters where id = ${charId};',
            {
                charId: id
            }
        )
            .then((result) => {
                // We got the character point
                lat1 = result[0].position.x;
                lng1 = result[0].position.y;
            })
            .catch((error) => {
                throw error;
            })

        return DB.query(
            'select characters.* from characters cross join users where characters.user_id=users.id and alliance_id <> (select users.alliance_id from characters cross join users where characters.user_id = users.id and characters.id =  ${charId});',
            {
                charId: id
            }
        )
            .then((result) => {
                result.forEach(function (element) {
                    var lat2 = element.position.x;
                    var lng2 = element.position.y;
                    var dis = 6378.138 * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat1 * Math.PI / 180 - lat2 * Math.PI / 180) / 2), 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.pow(Math.sin((lng1 * Math.PI / 180 - lng2 * Math.PI / 180) / 2), 2))) * 1000;
                    console.log(dis);
                    element.distance = dis;
                    if (dis <= radius)
                        ennemies.push(element);
                }, this);
                ennemies.sort(function (a, b) {
                    return parseInt(a["distance"]) > parseInt(b["distance"]) ? 1 : parseInt(a["distance"]) == parseInt(b["distance"]) ? 0 : -1;
                })
                ennemies.forEach(function (element) {
                    delete element.distance
                }, this);
                return ennemies;
            })
            .catch((error) => {
                throw error;
            })

    },

    // result 获取 坐标进行计算
    getInDistenceAlliance(id, radius) {
        var lat1 = 0;
        var lng1 = 0;
        var alliances = new Array;
        DB.query(
            'select position from characters where id = ${charId};',
            {
                charId: id
            }
        )
            .then((result) => {
                lat1 = result[0].position.x;
                lng1 = result[0].position.y;
                // console.log(x, y);
            })
            .catch((error) => {
                throw error;
            })

        return DB.query(
            'select characters.* from characters cross join users where characters.user_id=users.id and characters.id <> ${charId} and alliance_id= (select users.alliance_id from characters cross join users where characters.user_id = users.id and characters.id = ${charId});',
            {
                charId: id
            }
        )
            .then((result) => {
                result.forEach(function (element) {
                    var lat2 = element.position.x;
                    var lng2 = element.position.y;
                    var dis = 6378.138 * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((lat1 * Math.PI / 180 - lat2 * Math.PI / 180) / 2), 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.pow(Math.sin((lng1 * Math.PI / 180 - lng2 * Math.PI / 180) / 2), 2))) * 1000;
                    console.log(dis);
                    element.distance = dis;
                    if (dis <= radius)
                        alliances.push(element);
                }, this);
                alliances.sort(function (a, b) {
                    return parseInt(a["distance"]) > parseInt(b["distance"]) ? 1 : parseInt(a["distance"]) == parseInt(b["distance"]) ? 0 : -1;
                })
                alliances.forEach(function (element) {
                    delete element.distance
                }, this);
                return alliances;
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
const db = require('../config/config');

const Search = {};


Search.findByPlaca = () => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.msg,
        U.parqueadero,
        U.plaza,
        U.updated_at
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol	
    WHERE
        U.available = true
    GROUP BY
        U.id
    `
    return db.manyOrNone(sql);
    // return db.oneOrNone(sql, id);
}

Search.findByPlacaAndName = (search_name) => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.msg,
        U.parqueadero,
        U.plaza,
        U.updated_at
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol	
    WHERE
        U.available = true AND U.plate ILIKE $1
    GROUP BY
        U.id
    `
    return db.manyOrNone(sql,`%${search_name}%`);
    // return db.oneOrNone(sql, id);
}

Search.findByName = () => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.msg,
        U.parqueadero,
        U.plaza,
        U.updated_at
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol	
    WHERE
        U.available = true
    GROUP BY
        U.id
    `
    return db.manyOrNone(sql);
    // return db.oneOrNone(sql, id);
}

Search.findByNameAndName = (search_name) => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.msg,
        U.parqueadero,
        U.plaza,
        U.updated_at
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol	
    WHERE
        U.available = true AND U.name ILIKE $1
    GROUP BY
        U.id
    `
    return db.manyOrNone(sql,`%${search_name}%`);
    // return db.oneOrNone(sql, id);
}
module.exports = Search;
const db = require('../config/config');
const crypto = require('crypto');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        users
    `;

    return db.manyOrNone(sql);
}

User.updateToken = (id,session_token) => {
    const sql = `
    UPDATE
        users
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        session_token
    ]);
}

User.findById = (id, callback) => {
    const sql = `
    SELECT
        id,
        plate,
        name,
        email,
        ci,
        phone,
        img,
        msg,
        password,
        parqueadero,
        plaza,
        available,
        session_token
    FROM
        users
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByUserId = (id) => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.img,
        U.msg,
        U.password,
        U.parqueadero,
        U.plaza,
        U.available,
        U.session_token,
        json_agg(
            json_build_object(
            'id',R.id,
            'name',R.name,
            'img',R.img,
            'route',R.route
                
            )
        ) AS roles
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
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findByEmail = (email) => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.ci,
        U.phone,
        U.img,
        U.msg,
        U.password,
        U.parqueadero,
        U.plaza,
        U.available,
        U.session_token,
        json_agg(
            json_build_object(
            'id',R.id,
            'name',R.name,
            'img',R.img,
            'route',R.route
                
            )
        ) AS roles
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
        U.email = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, email);
}

User.createhistorial = (user) => {
    const sql = `
    INSERT INTO
        historial(
            plate,
            name,
            ci,
            phone,
            msg,
            parqueadero,
            plaza,
            entrada,
            salida,
            id_user
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;
    return db.oneOrNone(sql, [
        user.plate,
        user.name,
        user.ci,
        user.phone,
        user.msg,
        user.parqueadero,
        user.plaza,
        new Date(),
        '2022-09-04 20:50:40',
        user.id
    ]);
}

User.getAllhistorial = (id) => {
    const sql = `
    SELECT
        id,
        plate,
        name,
        ci,
        phone,
        msg,
        parqueadero,
        plaza,
		entrada,
		salida
    FROM
        historial
    WHERE
        id_user = '1' AND salida != '2022-09-04 20:50:40'
    GROUP BY
        id
    `
    return db.manyOrNone(sql, id);
}

User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        users(
            plate,
            name,
            email,
            ci,
            phone,
            img,
            msg,
            password,
            parqueadero,
            plaza,
            available,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.plate,
        user.name,
        user.email,
        user.ci,
        user.phone,
        user.img,
        user.msg,
        user.password,
        user.parqueadero,
        user.plaza,
        user.available,
        new Date(),
        new Date()
    ]);
}

User.update = (user) => {
    const sql = `
    UPDATE
        users
    SET
        plate = $2,
        plaza = $3,
        parqueadero = $4,
        msg= $5,
        available = $6,
        updated_at = $7
    WHERE
        id = $1
    `;
    return db.none(sql,[
        user.id,
        user.plate,
        user.plaza,
        user.parqueadero,
        user.msg,
        user.available,
        new Date()

    ])
}
User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;
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

User.updateToken = (id,token) => {
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
        token
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
        password,
        plaza,
        session_token
    FROM
        users
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByEmail = (email) => {
    const sql = `
    SELECT
        id,
        plate,
        name,
        email,
        ci,
        phone,
        img,
        password,
        plaza,
        session_token
    FROM
        users
    WHERE
        email = $1
    `
    return db.oneOrNone(sql, email);
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
            password,
            plaza,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.plate,
        user.name,
        user.email,
        user.ci,
        user.phone,
        user.img,
        user.password,
        user.plaza,
        new Date(),
        new Date()
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;
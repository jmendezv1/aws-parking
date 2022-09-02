const db = require('../config/config');

const Mensaje = {};

Mensaje.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        mensajes
    `;

    return db.manyOrNone(sql);
}

Mensaje.create = (mensaje) => {
    const sql = `
    INSERT INTO
        mensajes(
            description,
            created_s
        )
    VALUES($1, $2) RETURNING id
    `;

    return db.oneOrNone(sql, [
        mensaje.description,
        new Date()
    ]);
}

Mensaje.delete = (mensaje) => {
    const sql = `
    DELETE FROM
        mensajes
    WHERE id = $1
    `;
    return db.none(sql, mensaje.id);
}
module.exports = Mensaje;
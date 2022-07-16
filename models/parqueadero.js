const db = require('../config/config');
const Parqueadero = {}

Parqueadero.create = (parqueadero) =>{
    const sql = `
    INSERT INTO
        parqueaderos(
            name,
            description,
            created_ps,
            updated_ps   
        )
    VALUES ($1,$2,$3,$4) RETURNING id
    `;
    return db.oneOrNone(sql,[
        parqueadero.name,
        parqueadero.description,
        new Date(),
        new Date()
    ]);
}
module.exports = Parqueadero;
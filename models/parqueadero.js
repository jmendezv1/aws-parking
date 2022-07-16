const db = require('../config/config');
const Parqueadero = {};

Parqueadero.countParkingfree = (id_parking) => {
    const sql = `
    SELECT 
        COUNT(*) 
    FROM 
        sensors  
    WHERE (available = true) and (id_parking = $1) 
    `;

    return db.oneOrNone(sql,id_parking);
}

Parqueadero.getAll = () => {
    const sql = `
    SELECT 
        id,
        name,
        description
    FROM
        parqueaderos
    ORDER BY
        name
    `;

    return db.manyOrNone(sql);
}

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
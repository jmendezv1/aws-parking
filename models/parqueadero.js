const db = require('../config/config');
const Parqueadero = {};

Parqueadero.countByParkingfree = (id_parking) => {
    const sql = `
    SELECT 
        COUNT(*) 
    FROM 
        sensors  
    WHERE (available = false) and (id_parking = $1) 
    `;

    return db.oneOrNone(sql,id_parking);
}
Parqueadero.countParkingfree = () => {
    const sql = `
    SELECT 
        id_parking,
    COUNT (*) AS 
        cantidad 
    FROM 
        sensors 
    WHERE (available = false) 
    GROUP BY 
        id_parking 
    ORDER BY 
        id_parking
    `;

    return db.manyOrNone(sql);
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

Parqueadero.parking = () =>{
    const sql = `
    SELECT 
        U.id,
        U.name,
        U.plate,
        U.available,
        U.description
    FROM 
        sensors AS U 
    WHERE 
        (U.id = 1) OR (U.id = 2) OR (U.id = 3) OR (U.id = 4) OR (U.id = 5)
    ORDER BY 
        U.id
    `;
    return db.manyOrNone(sql);
}
module.exports = Parqueadero;
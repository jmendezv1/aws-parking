const db = require('../config/config');
const Sensor = {};

Sensor.findByParqueadero = (id_parking) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.lag_s,
        P.log_s,
        P.type_place,
        P.plate,
        P.code,
        P.available,
        P.description,
        P.id_parking
    FROM
	    sensors AS P
    INNER JOIN
	    parqueaderos AS C
    ON 
	    P.id_parking = C.id
    WHERE
	    C.id = $1
    `;
    return db.manyOrNone(sql,id_parking);
}

Sensor.create = (sensor) =>{
    const sql = `
    INSERT INTO
        sensors(
            name,
            type_place,
            plate,
            available,
            description,
            id_parking,
            created_srs,
            updated_srs  
        )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id
    `;
    return db.oneOrNone(sql,[
        sensor.name,
        sensor.type_place,
        sensor.plate,
        sensor.available,
        sensor.description,
        sensor.id_parking,
        new Date(),
        new Date()
    ]);
}
Sensor.update = (sensor) =>{
    const sql = `
    UPDATE
        sensors
    SET
        plate = $2,
        available = $3,
        description = $4,
        updated_srs = $5
    WHERE
        id = $1
    `;
    return db.none(sql,[
        sensor.id,
        sensor.plate,
        sensor.available,
        sensor.description,
        new Date()
    ]);
}
module.exports = Sensor;
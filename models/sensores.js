const db = require('../config/config');
const Sensor = {};

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
            created_ps,
            updated_ps   
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
        name = $2,
        type_place = $3,
        plate = $4,
        available = $5,
        description = $6,
        id_parking = $7,
        updated_ps = $8
    WHERE
        id = $1
    `;
    return db.none(sql,[
        sensor.id,
        sensor.name,
        sensor.type_place,
        sensor.plate,
        sensor.available,
        sensor.description,
        sensor.id_parking,
        new Date()
    ]);
}
module.exports = Sensor;
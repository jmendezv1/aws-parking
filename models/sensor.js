const db = require('../config/config');
// const crypto = require('crypto');

const Parking1Sensor = {};

Parking1Sensor.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        parking1_sensors
    `;

    return db.manyOrNone(sql);
}


// Parking1Sensor.updateToken = (id,token) => {
//     const sql = `
//     UPDATE
//         parking1_sensors
//     SET
//         session_token = $2
//     WHERE
//         id = $1
//     `;

//     return db.none(sql, [
//         id,
//         token
//     ]);
// }

// Parking1Sensor.findById = (id, callback) => {

//     const sql = `
//     SELECT
//         id,
//         plate,
//         session_token
//     FROM
//         parking1_sensors
//     WHERE
//         id = $1`;
    
//     return db.oneOrNone(sql, id).then(sensor => { callback(null, sensor); })

// }

// Parking1Sensor.findBysensorId = (id) => {
//     const sql = `
//     SELECT
//         U.id,
//         U.session_token,
//         json_agg(
//             json_build_object(
//             'id',R.id,
//             'name',R.name,
//             'img',R.img,
//             'route',R.route
                
//             )
//         ) AS roles
//     FROM
//         sensors AS U
//     INNER JOIN
//         sensor_has_roles AS UHR
//     ON
//         UHR.id_sensor = U.id
//     INNER JOIN
//         roles AS R
//     ON
//         R.id = UHR.id_rol	
//     WHERE
//         U.id = $1
//     GROUP BY
//         U.id
//     `
//     return db.oneOrNone(sql, id);
// }

// Parking1Sensor.findByEmail = (email) => {
//     const sql = `
//     SELECT
//         U.id,
//         U.plate,
//         U.name,
//         U.email,
//         U.password,
//         U.plaza,
//         U.session_token,
//         json_agg(
//             json_build_object(
//             'id',R.id,
//             'name',R.name,
//             'img',R.img,
//             'route',R.route
                
//             )
//         ) AS roles
//     FROM
//         sensors AS U
//     INNER JOIN
//         sensor_has_roles AS UHR
//     ON
//         UHR.id_sensor = U.id
//     INNER JOIN
//         roles AS R
//     ON
//         R.id = UHR.id_rol	
//     WHERE
//         U.email = $1
//     GROUP BY
//         U.id
//     `
//     return db.oneOrNone(sql, email);
// }

Parking1Sensor.create = (sensor) => {

    // const myPasswordHashed = crypto.createHash('md5').update(sensor.password).digest('hex');
    // sensor.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        parking1_sensors(
            name,
            lag_place,
            log_place,
            type_place,
            plate,
            code,
            available,
            description,
            created_s,
            updated_s
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
        sensor.name,
        sensor.lag_place,
        sensor.log_place,
        sensor.type_place,
        sensor.plate,
        sensor.code,
        sensor.available,
        sensor.description,
        new Date(),
        new Date()
    ]);
}

// Parking1Sensor.update = (sensor) => {
//     const sql = `
//     UPDATE
//         parking1_sensors
//     SET
//         plate = $2,
//         plaza = $3,
//         updated_at = $4
//     WHERE
//         id = $1
//     `;
//     return db.none(sql,[
//         sensor.id,
//         sensor.plate,
//         sensor.plaza,
//         new Date()

//     ])
// }
// Parking1Sensor.isPasswordMatched = (sensorPassword, hash) => {
//     const myPasswordHashed = crypto.createHash('md5').update(sensorPassword).digest('hex');
//     if (myPasswordHashed === hash) {
//         return true;
//     }
//     return false;
// }

module.exports = Parking1Sensor;
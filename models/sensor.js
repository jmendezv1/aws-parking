const db = require('../config/config');
const crypto = require('crypto');

const Sensor = {};

Sensor.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM
        sensors
    `;

    return db.manyOrNone(sql);
}
//CAMBIOOOOOSSSSSSS

Sensor.updateToken = (id,token) => {
    const sql = `
    UPDATE
        sensors
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

Sensor.findById = (id, callback) => {

    const sql = `
    SELECT
        id,
        plate,
        session_token
    FROM
        sensors
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(sensor => { callback(null, sensor); })

}

Sensor.findBysensorId = (id) => {
    const sql = `
    SELECT
        U.id,
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
        sensors AS U
    INNER JOIN
        sensor_has_roles AS UHR
    ON
        UHR.id_sensor = U.id
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

Sensor.findByEmail = (email) => {
    const sql = `
    SELECT
        U.id,
        U.plate,
        U.name,
        U.email,
        U.password,
        U.plaza,
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
        sensors AS U
    INNER JOIN
        sensor_has_roles AS UHR
    ON
        UHR.id_sensor = U.id
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

Sensor.create = (sensor) => {

    const myPasswordHashed = crypto.createHash('md5').update(sensor.password).digest('hex');
    sensor.password = myPasswordHashed;

    const sql = `
    INSERT INTO
        sensors(
            plate,
            name,
            password,
            plaza,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
        sensor.plate,
        sensor.name,
        sensor.email,
        sensor.img,
        sensor.password,
        sensor.plaza,
        new Date(),
        new Date()
    ]);
}
Sensor.update = (sensor) => {
    const sql = `
    UPDATE
        sensors
    SET
        plate = $2,
        plaza = $3,
        updated_at = $4
    WHERE
        id = $1
    `;
    return db.none(sql,[
        sensor.id,
        sensor.plate,
        sensor.plaza,
        new Date()

    ])
}
Sensor.isPasswordMatched = (sensorPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(sensorPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = Sensor;
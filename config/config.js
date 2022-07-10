const promise = require('bluebird');

const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114,function(stringValue){
    return stringValue;
});

const databaseConfig ={
    'host':'aws-server-parking.cfdbprk1yz9h.us-east-2.rds.amazonaws.com',
    'port':'5432',
    'database':'awsparkingserver',
    'user':'postgres',
    'password':'parking89'
};

const db = pgp(databaseConfig);

module.exports = db;
const SensorP1Controller = require('../controllers/sensorsController');

module.exports = (app) => {

     //TODO: Parqueadero 1
    //Get : Obtener datos
    app.get('/api/parking1_sensors/getAll',SensorP1Controller.getAll);
    //Post: Ingresr datos
    app.post('/api/parking1_sensors/create',SensorP1Controller.register);
    //Get : Obtener datos de plazas libres
    app.get('/api/parking1_sensors/placefree',SensorP1Controller.placefree);
}
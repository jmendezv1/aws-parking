const parqueaderoController = require('../controllers/parqueaderosController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Parqueadero 
    //Get : Obtener datos
    // app.get('/api/parking1_sensors/getAll',SensorP1Controller.getAll);
    //Post: Ingresar datos
    app.post('/api/parqueaderos/create',passport.authenticate('jwt',{session:false}),parqueaderoController.create);
    //Get : Obtener datos de plazas libres
    // app.get('/api/parking1_sensors/placefree',SensorP1Controller.placefree);
}
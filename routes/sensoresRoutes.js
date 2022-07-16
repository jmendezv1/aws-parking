const sensoresController = require('../controllers/sensoresController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Parqueadero 
    //Get : Obtener datos
    // app.get('/api/parking1_sensors/getAll',SensorP1Controller.getAll);
    //Post: Ingresar datos
    app.post('/api/sensores/create',passport.authenticate('jwt',{session:false}),sensoresController.create);
    //Get : Obtener datos de plazas libres
    // app.get('/api/parking1_sensors/placefree',SensorP1Controller.placefree);
}
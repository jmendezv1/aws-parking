const SensoresController = require('../controllers/sensoresController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Parqueadero 
    //Get : Obtener datos
    app.get('/api/sensores/findByParqueadero/:id_parking',passport.authenticate('jwt',{session:false}),SensoresController.findByParqueadero);
    //Post: Ingresar datos
    app.post('/api/sensores/create',passport.authenticate('jwt',{session:false}),SensoresController.create);
    //Get : Obtener datos de plazas libres
    // app.get('/api/parking1_sensors/placefree',SensorP1Controller.placefree);
}
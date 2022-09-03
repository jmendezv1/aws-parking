const SensoresController = require('../controllers/sensoresController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Sensores
    //Get : Obtener datos
    app.get('/api/sensores/findByParqueadero/:id_parking',passport.authenticate('jwt',{session:false}),SensoresController.findByParqueadero);
    //Post: Ingresar datos
    app.post('/api/sensores/create',passport.authenticate('jwt',{session:false}),SensoresController.create);
    //Get : Obtener datos de plazas libres
    // app.get('/api/parking1_sensors/placefree',SensorP1Controller.placefree);
    //Get: actualizar datos del usuario
    app.put('/api/sensores/update',passport.authenticate('jwt',{session:false}),SensoresController.update);

    app.put('/api/libelium/update',passport.authenticate('jwt',{session:false}),SensoresController.updatelibelium);

}

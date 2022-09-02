const MensajesController = require('../controllers/mensajesController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Mensajes
    //Get : Obtener datos
    // app.get('/api/mensajes/findByParqueadero/:id_parking',passport.authenticate('jwt',{session:false}),SensoresController.findByParqueadero);
    //Post: Ingresar datos
    app.post('/api/mensajes/create',passport.authenticate('jwt',{session:false}),MensajesController.create);
    //Get : Obtener datos de plazas libres
    app.get('/api/mensajes/All',MensajesController.getAll);
    //Get: actualizar datos del usuario
    app.put('/api/mensajes/delete',passport.authenticate('jwt',{session:false}),MensajesController.delete);

    // app.put('/api/mensajes/update',passport.authenticate('jwt',{session:false}),MensajesController.update);


}

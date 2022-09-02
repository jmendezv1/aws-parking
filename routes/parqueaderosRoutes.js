const ParqueaderoController = require('../controllers/parqueaderosController');
const passport =require('passport');

module.exports = (app) => {

     //TODO: Parqueadero 
    //Get : Obtener datos
    app.get('/api/parqueaderos/getAll',passport.authenticate('jwt',{session:false}),ParqueaderoController.getAll);
    //Post: Ingresar datos
    app.post('/api/parqueaderos/create',passport.authenticate('jwt',{session:false}),ParqueaderoController.create);
    //Get : Obtener datos de plazas libres
    app.get('/api/parqueaderos/countByParkingfree/:id_parking',passport.authenticate('jwt',{session:false}),ParqueaderoController.countByParkingfree);
    //Get : Obtener datos de las plazas libres de los parqueaderos
    app.get('/api/parqueaderos/countParkingfree',passport.authenticate('jwt',{session:false}),ParqueaderoController.countParkingfree);


    app.get('/api/parqueaderos/obtener',passport.authenticate('jwt',{session:false}),ParqueaderoController.parking);
    //Post: Ingresar datos

}

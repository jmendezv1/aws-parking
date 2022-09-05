const UserController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app) => {

    //TODO: Users
    //Get : Obtener datos
    app.get('/api/users/getAll',UserController.getAll);
    //Get : Obtener datos actualizados del user
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session:false}), UserController.findById);
    //Post: Ingresr datos
    app.post('/api/users/create',UserController.register);

    // historial
    app.post('/api/users/create/historial',UserController.registerhistorial);
    app.get('/api/users/historial/:id',UserController.allhistorial);


    //Post: para emitir un login
    app.post('/api/users/login',UserController.login);
    //Post: para dalir del login
    app.post('/api/users/logout',UserController.logout);
    //Get: actualizar datos del usuario
    app.put('/api/users/update',passport.authenticate('jwt',{session:false}),UserController.update);

}
const UserController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app) => {
    //Get : Obtener datos
    app.get('/api/users/getAll',UserController.getAll);
    //Get : Obtener datos actualizados del user
    app.get('/api/users/findById/:id',UserController.findById);

    //Post: Ingresr datos
    app.post('/api/users/create',UserController.register);
    //Post: para emitir un login
    app.post('/api/users/login',UserController.login);
    //Get: actualizar datos del usuario
    app.put('/api/users/update',UserController.update);

}

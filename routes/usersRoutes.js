const UserController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app) => {
    //Get : Obtener datos
    app.get('/api/users/getAll',UserController.getAll);
    //Post: Ingresr datos
    app.post('/api/users/create',UserController.register);
    //Post: para emitir un login
    app.post('/api/users/login',UserController.login);
    //Post: para emitir un login
    // app.post('/api/users/login',UserController.login);

}

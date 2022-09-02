const SearchController = require('../controllers/searchController');
const passport = require('passport');

module.exports = (app) => {

    //TODO: Search
    //Get : Obtener datos actualizados del user
    app.get('/api/search/getAllPlaca',passport.authenticate('jwt',{session:false}), SearchController.getAllPlaca);
    //Get : Obtener datos actualizados del user
    app.get('/api/search/getAllPlacaAndName/:search_name',passport.authenticate('jwt',{session:false}), SearchController.getAllPlacaAndName);
    //Get : Obtener datos actualizados del user
    app.get('/api/search/getAllName',passport.authenticate('jwt',{session:false}), SearchController.getAllName);
    //Get : Obtener datos actualizados del user
    app.get('/api/search/getAllNameAndName/:name',passport.authenticate('jwt',{session:false}), SearchController.getAllNameAndName);
}
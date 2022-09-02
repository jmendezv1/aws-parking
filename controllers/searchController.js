const Search = require('../models/search');

module.exports = {

    async getAllPlaca(req, res, next) {
        try {
            const data = await Search.findByPlaca();    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener las placas'
            });
        }
    },
    async getAllPlacaAndName(req, res, next) {
        try {
            const search_name = req.params.search_name;
            const data = await Search.findByPlacaAndName(search_name);    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener las placas'
            });
        }
    },
    async getAllName(req, res, next) {
        try {
            const data = await Search.findByName();    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener las placas'
            });
        }
    },
    async getAllNameAndName(req, res, next) {
        try {
            const name = req.params.name;
            const data = await Search.findByNameAndName(name);
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener las placas'
            });
        }
    },

};

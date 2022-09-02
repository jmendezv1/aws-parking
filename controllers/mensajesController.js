const Mensajes = require('../models/mensajes');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Mensajes.getAll();    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los mensajes'
            });
        }
    },

    async create(req, res, next) {
        try {
            
            const mensaje = req.body;
            const data = await Mensajes.create(mensaje);
            mensaje.id = data.id;

            return res.status(201).json({
                success: true,
                message: 'La creacion de mensaje fue realizado correctamente',
                data: data.id
            });
        } 

        catch (error) {po
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la creacion del mensaje',
                error: error
            });
        }
    },
    
    async delete(req, res, next) {
        try {
            const mensaje = req.body;

            await Mensajes.delete(mensaje);
            return res.status(201).json({
                success: true,
                message: 'La eliminacion del mensaje fue realizado correctamente'
            });
        } 

        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la elimiacion del mensaje',
                error: error
            });
        }
    },

};

const Sensor = require('../models/sensores');
// const jwt = require('jsonwebtoken');
// const keys = require('../config/keys');

module.exports = {

    async findByParqueadero(req, res, next) {
        try {
            const id = req.params.id_parking; //CLIENTE
            const data = await Sensor.findByParqueadero(id); 
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener todos los sensores del parqueadero x',
                error: error
            });
        }
    },

    // async getAll(req, res, next) {
    //     try {
    //         const data = await Parking1Sensor.getAll();    
    //         console.log(`Parking1: ${data}`);
    //         return res.status(201).json(data);
    //     } 
    //     catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Error al obtener los datos de los sensores en el parqueadero 1'
    //         });
    //     }
    // },
    // async placefree(req, res, next) {
    //     try {
    //         const data = await Parking1Sensor.placefree();    
    //         console.log(`Parking1: ${data}`);
    //         return res.status(201).json({
    //             success: true,
    //             data: data,
    //             message:'La consulta de plazas libres fue realizado correctamente'
    //         });
    //     } 
    //     catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Error al obtener el dato de plazas libres'
    //         });
    //     }
    // },
    async create(req, res, next) {
        try {
            let sensor = req.body;
            const data = await Sensor.create(sensor);
            sensor.id = data.id;
            // await Rol.create(data.id,1); //ROL POR DEFENCTO (USER)
            return res.status(201).json({
                success: true,
                message: 'El registro del sensor se realizo correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el sensor',
                error: error
            });
        }
    },

    async update(req, res, next) {
        try {
            const sensor = req.body;
            await Sensor.update(sensor);
            return res.status(201).json({
                success: true,
                message: 'Los datos del sensor se actualizaron correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualización de datos del sensor',
                error: error
            });
        }
    },

};
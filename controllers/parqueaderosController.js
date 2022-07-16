const Parqueadero = require('../models/parqueadero');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Parqueadero.getAll();   
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los parqueaderos',
                error: error
            });
        }
    },
    async countParkingfree(req, res, next) {
        try {
            const id = req.params.id_parking; //CLIENTE
            const data = await Parqueadero.countParkingfree(id);   
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el dato de plazas libres'
            });
        }
    },
    async create(req,res,next){
        try {
            const parqueadero = req.body;
            console.log(`Parqueadero enviado: ${parqueadero}`);
           
            const data = await Parqueadero.create(parqueadero);

            return res.status(201).json({
                success: true,
                message: 'El parqueadero fue creado correctamente',
                data:data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear el parqueadero',
                error:error
            });
        }
    }
}
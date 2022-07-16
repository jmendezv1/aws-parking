const Parqueadero = require('../models/parqueadero');

module.exports = {

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
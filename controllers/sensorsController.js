const Parking1Sensor = require('../models/sensor');
// const jwt = require('jsonwebtoken');
// const keys = require('../config/keys');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Parking1Sensor.getAll();    
            console.log(`Parking1: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los datos de los sensores en el parqueadero 1'
            });
        }
    },
    async placefree(req, res, next) {
        try {
            const data = await Parking1Sensor.placefree().data;    
            console.log(`Parking1: ${data}`);
            return res.status(201).json({
                success: true,
                data: data,
                message:'La consulta de plazas libres fue realizado correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el dato de plazas libres'
            });
        }
    },
    async register(req, res, next) {
        
        // console.log(`Sensor: ${data} a sido creado`);
        try {
            const sensor = req.body;
            const data = await Parking1Sensor.create(sensor);

            // await Rol.create(data.id,1); //ROL POR DEFENCTO (USER)

            return res.status(201).json({
                success: true,
                message: 'El registro del sensor P1 se realizo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del sensor P1 revisar los parametros ingresados',
                error: error
            });
        }
    },
    // async update(req, res, next) {
    //     try {
    //         const user = req.body;

    //         await User.update(user);

    //         return res.status(201).json({
    //             success: true,
    //             message: 'Los datos del usuario se actualizaron correctamente'
    //         });

    //     } 
    //     catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Hubo un error con la actualización de datos del usuario',
    //             error: error
    //         });
    //     }
    // },
    
    // async login(req, res, next) {
    //     try {
    //         const email = req.body.email;
    //         const password = req.body.password;

    //         const myUser = await User.findByEmail(email);

    //         if (!myUser) {
    //             return res.status(401).json({
    //                 success: false,
    //                 message: 'El email no fue encontrado'
    //             });
    //         }

    //         if (User.isPasswordMatched(password, myUser.password)) {
    //             const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
    //                 // expiresIn: (60*60*24) // 1 HORA
    //                 expiresIn: (60*2) // 2 minutos

    //             });
    //             const data = {
    //                 id: myUser.id,
    //                 plate: myUser.plate,
    //                 name: myUser.name,
    //                 email: myUser.email,
    //                 ci: myUser.ci,
    //                 phone: myUser.phone,
    //                 img: myUser.img,
    //                 password: myUser.password,
    //                 plaza: myUser.plaza,
    //                 session_token: `JWT ${token}`,
    //                 roles: myUser.roles
    //             }

    //             await User.updateToken(myUser.id,`JWT ${token}`);

    //             // console.log(`Usuario: ${data.email} a sido creado`);
    //             // console.log(`Usuario: ${data.email} a sido creado`);

    //             return res.status(201).json({
    //                 success: true,
    //                 data: data,
    //                 message:'El usuario ha sido autentificado'
    //             });
    //         }
    //         else {
    //             return res.status(401).json({
    //                 success: false,
    //                 message: 'La contraseña es incorrecta'
    //             });
    //         }

    //     } 
    //     catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Error al momento de hacer login',
    //             error: error
    //         });
    //     }
    // },
    // async logout(req, res, next) {
    //     const id = req.body.id;
    //     try {
    //         // const id = req.body.id;
    //         await User.updateToken(id,null);

    //         return res.status(201).json({
    //             success: true,
    //             message: 'La sesion del usuario se ha cerrado correctamente'
    //         });

    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         console.log(`Usuario: ${id}`);

    //         return res.status(501).json({
    //             success: false,
    //             message: 'Error al momento de cerrar sesion',
    //             error: error
    //         });  
    //     }
    // }


};
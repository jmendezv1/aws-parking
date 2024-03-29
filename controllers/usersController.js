const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { findById } = require('../models/user');

module.exports = {

    
    
    async allhistorial(req, res, next) {
        try {
            const id = req.params.id;
            const data = await User.getAllhistorial(id);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el historial'
            });
        }
    },
    
    
    
    async registerhistorial(req, res, next) {
        try {
            
            const user = req.body;
            const data = await User.createhistorial(user);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario revisar los parametros ingresados',
                error: error
            });
        }
    },


    async getAll(req, res, next) {
        try {
            const data = await User.getAll();    
            // console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);  
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener actualizados del usuario'
            });
        }
    },

    async register(req, res, next) {
        try {
            
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id,1); //ROL POR DEFENCTO (USER)

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });
        } 

        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario revisar los parametros ingresados',
                error: error
            });
        }
    },
    
    async update(req, res, next) {
        try {
            const user = req.body;
            await User.update(user);
            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente'
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualización de datos del usuario',
                error: error
            });
        }
    },
    
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 HORA
                    // expiresIn: (60*2) // 2 minutos

                });
                const data = {
                    id: myUser.id,
                    plate: myUser.plate,
                    name: myUser.name,
                    email: myUser.email,
                    ci: myUser.ci,
                    phone: myUser.phone,
                    img: myUser.img,
                    msg: myUser.msg,
                    password: myUser.password,
                    parqueadero:myUser.parqueadero,
                    plaza: myUser.plaza,
                    available: myUser.available,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                await User.updateToken(myUser.id,`JWT ${token}`);

                // console.log(`Usuario: ${data.email} a sido creado`);
                // console.log(`Usuario: ${data.email} a sido creado`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message:'El usuario ha sido autentificado'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },
    async logout(req, res, next) {
        const id = req.body.id;
        try {
            // const id = req.body.id;
            await User.updateToken(id,null);

            return res.status(201).json({
                success: true,
                message: 'La sesion del usuario se ha cerrado correctamente'
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            console.log(`Usuario: ${id}`);

            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sesion',
                error: error
            });  
        }
    }


};

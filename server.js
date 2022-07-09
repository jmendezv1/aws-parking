const express = require('express'); // Requerir el paquete
const app = express(); // ejecutando la app
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/*
* RUTAS
*/

const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

// Settings

app.use(logger('dev')); // debuger posibles errores
app.use(express.json()); // parcial en formato json
app.use(express.urlencoded({
    extended: true
})); 

app.use(cors()); // l pasamos los cors

app.disable('x-powered-by'); // para la seguridad

app.set('port',port);

/*
* LLAMANDO A LAS RUTAS
*/
users(app);
//172.16.220.73
//192.168.0.127
//172.16.214.174
//18.220.155.194

server.listen(3000,'192.168.0.127' || 'localhost', function(){
    console.log('Aplicacion de NodeJs '+ port + ' Iniciada...')
});

// app.get('/',(req,res) =>{
//     res.send('Ruta rais del backend');
// });

// app.get('/test',(req,res) =>{
//     res.send('Ruta test');
// });

// ERROR HANDLER
app.use((err,req,res,next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app:app,
    server:server
}

/* module.exports = server;
* 200 - Es una respuesta exitosa
* 404 - que la URL no existe
* 500 - error interno del server codigo mal
* 504 - Esta respuesta de error es dada cuando el servidor está actuando 
*       como una puerta de enlace y no puede obtener una respuesta a tiempo.
*/      

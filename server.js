const express = require('express'); // Requerir el paquete
const app = express(); // ejecutando la app
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport =require('passport');

/*
* RUTAS
*/

const users = require('./routes/usersRoutes');
const parqueaderos = require('./routes/parqueaderosRoutes');
const sensores = require('./routes/sensoresRoutes');
// const port = process.env.PORT || 3000;
const port = 3000;

// Settings

app.use(logger('dev')); // debuger posibles errores
app.use(express.json()); // parcial en formato json
app.use(express.urlencoded({
    extended: true
})); 

app.use(cors()); // l pasamos los cors
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by'); // para la seguridad

app.set('port',port);

/*
* LLAMANDO A LAS RUTAS
*/
users(app);
parqueaderos(app);
sensores(app);

// server.listen(3000,'172.16.217.195' || 'localhost', function(){
//     console.log('Aplicacion de NodeJs '+ port + ' Iniciada...')
// });

server.listen(port, () => {
    console.log('Aplicacion de NodeJs '+ port + ' Iniciada...')
});


app.get('/test',(req,res) =>{
    res.send('Copiar codigos del video de youtube y de curso mini');
});

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

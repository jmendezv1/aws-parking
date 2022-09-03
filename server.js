const express = require('express'); // Requerir el paquete
const app = express();
const apphttps = express();  // ejecutando la app
const http = require('http');
const server = http.createServer(app);// Node Server
const logger = require('morgan');
const cors = require('cors');
const passport =require('passport');

const https = require('https');
const path = require('path');
const fs = require('fs');

const sslServer = https.createServer({
    cert: fs.readFileSync('server.cer'),
    key: fs.readFileSync('server.key'),
}, apphttps);

sslServer.listen(443,(err) => {
    if (err) throw new Error(err);

    console.log('Servidor https corriendo en el puerto 443')
    
});

apphttps.get('/https',(req,res) =>{

    res.send('Servidor https esta funcionando ');

});

apphttps.post('/libelium',(req,res) =>{

    let data = "";
    let chunkIndex = 0;

    req.on("data",(chunk) =>{
        data += chunk;
        chunkIndex ++;
        console.log(chunkIndex);
    });
    req.on("end",() =>{
        console.log(data);
        console.log("Recibido");
        // res.end("Recibido");
    }); 
    // res.send('Copiar codigos del video de youtube y de curso mini');
});
// const io = require('socket.io')(server);


// Nodo server
// require('./sockets/menssage_socket');
/*
* RUTAS
*/

const users = require('./routes/usersRoutes');
const parqueaderos = require('./routes/parqueaderosRoutes');
const sensores = require('./routes/sensoresRoutes');
const search = require('./routes/searchRoutes');
const mensajes = require('./routes/mensajesRoutes');
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
search(app);
mensajes(app);

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log('Aplicacion de NodeJs '+ port + ' Iniciada...')
});

// server.listen(port, (err) => {
//     if (err) throw new Error(err);
//     console.log('Aplicacion de NodeJs '+ port + ' Iniciada...')
// });

app.post('/libelium',(req,res) =>{

    let sensor = req.body;
    console.log(JSON.stringify(sensor));
    // let data = "";
    // let chunkIndex = 0;

    // req.on("data",(chunk) => {
    //     data += chunk;

    //     chunkIndex++;
    //     console.log(chunkIndex);
    // });
    return res.status(201).json({
        success: true
    });

    // req.on("end",() => {
    // //     console.log(data);
    //     console.log("Recibido");
    //     res.end("Recidooo");
    // }); 
    // res.send('Copiar codigos del video de youtube y de curso mini');
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
    // io:io
}

/* module.exports = server;
* 200 - Es una respuesta exitosa
* 404 - que la URL no existe
* 500 - error interno del server codigo mal
* 504 - Esta respuesta de error es dada cuando el servidor está actuando 
*       como una puerta de enlace y no puede obtener una respuesta a tiempo.
*/      

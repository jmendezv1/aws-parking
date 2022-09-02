
module.exports = (io) => {

    const orderDriverNamespace = io.of('/driver');
    orderDriverNamespace.on('connection', function(socket){
        console.log('USUARIO CONECTADO AL NAMESPACE /driver');

        socket.on('position', function(data){
            orderDriverNamespace.emit(`position/${data.id_order}`,{lat:data.lat})
        });
    });
}



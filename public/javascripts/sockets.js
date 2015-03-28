
(function() {
  id = Math.floor(10 * Math.random())
  var socket = io.connect('http://172.16.2.136:3000');
  socket.emit('join', {
    id: id
  });

  socket.on('joined', function(data){
    console.log(data.message);
  });

  socket.on('start', function(){
      world.init()
  });

})();

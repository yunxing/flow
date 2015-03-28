
(function() {
  id = Math.floor(10 * Math.random())
  var socket = io.connect('http://localhost:3000');
  socket.emit('join', {
    id: id
  });

  socket.on('joined', function(data){
    console.log(data.message);
  });

})();

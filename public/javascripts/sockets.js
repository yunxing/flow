var socket = io.connect('http://localhost:3000');

(function() {
  id = Math.floor(10 * Math.random())
  socket.emit('join', {
    id: id
  });

  socket.on('joined', function(data){
    console.log(data.message);
  });

  socket.on('start', function(){
      worldM.init()
      world = _.cloneDeep(worldM);
  });

  socket.on('create', function(data){
      worldM.updateToLogicTime(data.ts);
      worldM.updateEvent(data);
      world = _.cloneDeep(worldM);
  });

})();

var createFighter = function() {
    socket.emit('create', {
        type:1
    });
}

var createArcher = function() {
    socket.emit('create', {
        type:2
    });
}

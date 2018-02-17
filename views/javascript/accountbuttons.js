var socket = io.connect();
			 
function buttonTokenChange(){
  socket.emit('buttonTokenChange');
}

//when we receive buttonUpdate, do this
socket.on('buttonUpdate', function(data){
    document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
});
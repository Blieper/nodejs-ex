const socket = io.connect('/');

function buttonTokenChange(){
  if (confirm("Are you sure you want to change your API token?")) {
    socket.emit("change_token", apikey);
  }
}

socket.on("get_new_token", token => {
  console.log('New token! ' + token);
  $('#apitoken').text('API key:    ' + token);
  apikey = token;
});

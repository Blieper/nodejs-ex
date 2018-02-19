const socket = io();

function buttonTokenChange(){
  if (confirm("Are you sure you want to change your API token?")) {
    socket.emit("change_token", APIToken);
  }
}

socket.on("get_new_token", token => {
  console.log('New token! ' + token);
  $('#apitoken').text('API Token:    ' + token);
  APIToken = token;
});

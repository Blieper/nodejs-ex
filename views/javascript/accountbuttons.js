const socket = io.connect('/');

function buttonTokenChange() {
  if (confirm("Are you sure you want to change your API token?")) {
    socket.emit("change_token", apikey);
  }
}

socket.emit('request_token', user);

socket.on("get_token", token => {
  $('#apitoken').text('API key:    ' + token);
  apikey = token;
});

function TermsDialog() {
  let dialogButton = document.querySelector('#changebutton');

  let dialog = document.querySelector('#terms');

  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  dialogButton.onclick = dialog.showModal;

  dialog.querySelector('button:not([disabled])')
    .addEventListener('click', function () {
      dialog.close();
    });

  let actionButtons = $(dialog).find("button");
  let agreeButton = $(actionButtons[0]);
  let disagreeButton = $(actionButtons[1]);

  agreeButton.click(function () { //send registration data with this!
    registerData();
    dialogButton.onclick = buttonTokenChange; // Remove dialogue functionality from register button
  });

  disagreeButton.click(function () { //should redirect or something we'll decide later
    dialog.close();
  });
}

$(document).ready(TermsDialog);
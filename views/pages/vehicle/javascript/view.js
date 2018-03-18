
const socket = io.connect('/');

function getOwners (owners) {
    socket.emit("request_steamowners",owners);
}

let steamOwners = [];

socket.on("get_steamowners", data => {
    steamOwners = data;
    steamOwners.push(user);

    let names = []

    for (i of steamOwners) {
        names.push(i.personaname || i.displayName);
    }

    let carOwners = $('.carowners');

    $(carOwners).empty();
    $(carOwners).append(names.length > 1 ? '<h5 id="h_owners">Owners</h5>' : '<h5 id="h_owners">Owner</h5>')
    $(carOwners).append('<h6>' + names.reverse().join().replace(/,/,', ') + '</h6>')
});

function generateView() {
    let data = extra;

    console.log(JSON.stringify(data))

    let preview = $('#view');
    $(preview).empty();

    let header = $("<h3></h3>");
    $(header).html(data.name);

    let imgdiv = $('<div class="imgdiv"></div>');

    for (image of data.images) {
        let img = $('<img class="carimg" src="' + image + '"/>');

        imgdiv.append(img);
    }

    let description = $("<p></p>");

    $(description).html(data.description);

    let stats = $("<ul class='mdl-list'></ul>");

    for (i of data.specs) {
        stats.append('<li class="mdl-list__item">' + i.key  + ": " + i.value + '</li>');
    }

    $(preview).append("<hr>");
    $(preview).append(header);
    $(preview).append(imgdiv);
    $(preview).append('<div class="carowners"><h5 id="h_owners">Owner</h5></div>');
    $(preview).append('<h5>License</h5>');
    $(preview).append("XX-XX-XXXX");
    if (data.manufacturer) {
        if (data.manufacturer.length) {
            $(preview).append('<h5>Manufacturer</h5>');
            $(preview).append('<h6>' + data.manufacturer + '</h6>');
        }
    }
    $(preview).append("<hr>");
    $(preview).append('<h5>Description</h5>');
    $(preview).append(description);
    $(preview).append("<hr>");
    $(preview).append('<h5>Region</h5>');
    $(preview).append('<h6>' + data.region + '</h6>');   
    $(preview).append('<h5>Country</h5>');
    $(preview).append('<h6>' + data.country + '</h6>');     

    if (data.specs.length) {
        $(preview).append('<h5>Specs</h5>');
        $(preview).append(stats);
    }

    if (data.tags.length > 0) {
        $(preview).append('<div class="tags"><h5 id="h_tags">Tag</h5></div>');

        $('.tags').empty();
        $('.tags').append(data.tags.length > 1 ? '<h5 id="h_tags">Tags</h5>' : '<h5 id="h_tags">Tag</h5>')
        $('.tags').append('<h6>' + data.tags.join().replace(/,\s*/g,', ') + '</h6>')
    }

    getOwners (data.coowners)

    console.log(data);
}

console.log(extra);

generateView();
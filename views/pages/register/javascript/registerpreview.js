// necessary thing to get html entities as opposed to literal symbols (will be serverside)
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br/>');
}

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

function generatePreview() {
    let data = createDataObject();

    console.log(JSON.stringify(data))

    let preview = $('#preview');
    $(preview).empty();

    let header = $("<h3></h3>");
    $(header).html(data.name);

    let imgdiv = $('<div class="imgdiv"></div>');

    for (image of data.images) {
        let img = $('<img class="carimg" src="' + image + '"/>');

        imgdiv.append(img);
    }

    let description = $("<p></p>");

    $(description).html(htmlEntities(data.description));


    let stats = $("<ul class='mdl-list'></ul>");

    for (i of data.specs) {
        stats.append('<li class="mdl-list__item">' + i + '</li>');
    }

    $(preview).append("<hr>");
    $(preview).append(header);
    $(preview).append(imgdiv);
    $(preview).append('<div class="carowners"><h5 id="h_owners">Owner</h5></div>');
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

    if (data.tags.split(/,/).length) {
        $(preview).append('<div class="tags"><h5 id="h_tags">Tag</h5></div>');

        $('.tags').empty();
        $('.tags').append(data.tags.split(/,/).length > 1 ? '<h5 id="h_tags">Tags</h5>' : '<h5 id="h_tags">Tag</h5>')
        $('.tags').append('<h6>' + data.tags.split(/,/).join().replace(/,\s*/g,', ') + '</h6>')
    }

    getOwners (data.coowners)

    console.log(data);
}

$('#previewbutton').click(function () { generatePreview() });

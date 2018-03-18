const socket = io.connect('/');

steamIDs = [];

function getOwners (owners) {
    let rawIDs = [];

    for (i of steamIDs) {
        rawIDs.push(i.id);
    }

    socket.emit("request_steamowners",rawIDs);
}

let steamOwners = [];

socket.on("get_steamowners", data => {
    console.log(data);

    for (i = 0; i < data.length; i++) {
        let steamUser = data[i];

        let object = steamIDs[i].object;

        $(object).html(steamUser.personaname);
    }
});

function makeCard (content) {
    let div = $('<a class="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col"></a>');

    let href = extra.url.substring(-1) + 'browse?license=' + content.license;
    console.log(href);
    $(div).attr('href',href)

    let titleCard = $('<div class="mdl-card__title mdl-card--expand"></div>');

    $(titleCard).css('background-image', 'url(' + content.images[0] + ')');

    let header = $('<h2 class="mdl-card__title-text"></h2>');
    $(header).html(content.name);
    $(titleCard).append(header);

    let owner = $('<div class="mdl-card__supporting-text usertag"></div>');
    steamIDs.push({ id: content.owner, object: owner });
    $(div).append(titleCard);
    $(div).append(owner);

    $('#view').append(div)
}

console.log(extra);

for (i of extra.vehicles) {
    console.log(i);

    makeCard (i)
}   

getOwners(steamIDs);

componentHandler.upgradeDom();
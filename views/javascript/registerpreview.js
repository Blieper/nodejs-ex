// necessary thing to get html entities as opposed to literal symbols (will be serverside)
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br/>');
}

function generatePreview () {
    let data = createDataObject();

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

    $(preview).append(header);
    $(preview).append(imgdiv);
    $(preview).append('<h5>Description</h5>');    
    $(preview).append(description);

    console.log(data);
}

$('#previewbutton').click(function () { generatePreview() });

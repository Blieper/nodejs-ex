let imageFields = $('.imagefields');
let cOwnerFields = $('.co-owners');

function addImageField() {

    let d = document.createElement('div');
    $(d).addClass('imagefield');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');
    $(textField).css({"width" : "70%"});

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
    $(input).addClass('in_image');
    $(input).attr('type', 'text');

    let label = document.createElement('label');
    $(label).addClass('mdl-textfield__label');
    $(label).html('Image Link');

    let removeBtn = document.createElement('button');
    $(removeBtn).addClass('mdl-button');
    $(removeBtn).addClass('mdl-js-button');
    $(removeBtn).addClass('mdl-button--raised');
    $(removeBtn).addClass('mdl-js-ripple-effect');
    $(removeBtn).html('remove');
    $(removeBtn).css({"margin" : "10px"});
    $(removeBtn).click(function () {
        $(d).slideToggle(200,function(){
            d.remove();
        });
    });

    $(textField).append(input);
    $(textField).append(label);

    $(d).append(textField);
    $(d).append(removeBtn);

    $(imageFields).append(d);

    $(d).hide();
    $(d).slideToggle(200);

    componentHandler.upgradeDom();
}

function addCoOwner() {
    let d = document.createElement('div');
    $(d).addClass('ownerField');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');
    $(textField).css({"width" : "70%"})

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
    $(input).addClass('in_coowner');
    $(input).attr('type', 'text');
    $(input).attr('pattern',"7656119(\\d{10})");

    let label = document.createElement('label');
    $(label).addClass('mdl-textfield__label');
    $(label).html('steamid64');

    let error = document.createElement('span');
    $(error).addClass('mdl-textfield__error');
    $(error).html('Input is not a valid 64bit steam id');

    let removeBtn = document.createElement('button');
    $(removeBtn).addClass('mdl-button');
    $(removeBtn).addClass('mdl-js-button');
    $(removeBtn).addClass('mdl-button--raised');
    $(removeBtn).addClass('mdl-js-ripple-effect');
    $(removeBtn).html('remove');
    $(removeBtn).css({"margin" : "10px"});

    $(removeBtn).click(function () {
        $(d).slideToggle(200,function(){
            d.remove();
        });
    });

    $(textField).append(input);
    $(textField).append(label);
    $(textField).append(error);

    $(d).append(textField);
    $(d).append(removeBtn);

    $(cOwnerFields).append(d);

    $(d).hide();
    $(d).slideToggle(200);

    componentHandler.upgradeDom();
}


$('#addimagelinks').click(addImageField);
$('#addco-owner').click(addCoOwner);

function createDataObject () {
    let data = {};

    data.name = document.getElementById("in_vehiclename").value;
    data.description = document.getElementById("in_description").value;

    data.region = document.getElementById("in_region") ? document.getElementById("in_region").value : "nothing";    
    data.country = document.getElementById("in_country") ? document.getElementById("in_country").value : "nothing";    
    
    data.images = [];
    data.coowners = [];

    for (i of document.getElementsByClassName("in_image")) {
        if (i.value.length > 0) {
            data.images.push(i.value);
        }
    }

    for (i of document.getElementsByClassName("in_coowner")) {
        if (/7656119(\d{10})/.test(i.value)) {
            data.coowners.push(i.value);
        }
    }

    return data;
}

// necessary thing to get html entities as opposed to literal symbols (will be serverside)
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function registerData () {
    let data = createDataObject();

    console.log(JSON.stringify(data));

    let a = htmlEntities(data.description);

    $(".page-content").append("<p>" + a + "</p>");

}
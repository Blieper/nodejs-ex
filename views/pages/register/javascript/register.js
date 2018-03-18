// Get image/coowner cookies
let Cookie_Images = Cookies.getJSON('images');
let Cookie_Coowners = Cookies.getJSON('coowners');
let Cookie_Name = Cookies.get('name');
let Cookie_Description = Cookies.get('description');
let Cookie_Dialogue = Cookies.get('dialogue');
let Cookie_Tags = Cookies.get('tags');
let Cookie_Specs = Cookies.getJSON('specs');
let Cookie_Manufacturer = Cookies.get('manu');

$(window).on("unload", function () {
    let data = [];

    for (i of document.getElementsByClassName("in_image")) {
        if (i.value.length > 0) {
            data.push(i.value);
        }
    }

    Cookies.set('images', data);

    data = [];

    for (i of document.getElementsByClassName("in_coowner")) {
        if (i.value.length > 0) {
            data.push(i.value);
        }
    }

    Cookies.set('coowners', data);

    data = [];

    for (i of document.getElementsByClassName("in_spec")) {
        if (i.value.length > 0) {
            data.push(i.value);
        }
    }

    Cookies.set('specs', data);
    Cookies.set('name', $("#in_vehiclename").val());
    Cookies.set('description', $("#in_description").val());  
    Cookies.set('tags', $("#in_tags").val());  
    Cookies.set('manu', $("#in_manufacturer").val());           
});

$(document).ready(function () {
    if (Cookie_Images && Cookie_Images instanceof Array) {
        for (i of Cookie_Images) {
            addImageField(i)
        }
    }

    if (Cookie_Coowners && Cookie_Coowners instanceof Array) {
        for (i of Cookie_Coowners) {
            addCoOwner(i)
        }
    }

    if (Cookie_Specs && Cookie_Specs instanceof Array) {
        for (i of Cookie_Specs) {
            addSpec(i)
        }
    }

    if (Cookie_Name) {
        $('#in_vehiclename').val(Cookie_Name);
        $('#in_vehiclename').parent().find('.mdl-textfield__label').html('');
    }

    if (Cookie_Description) {
        $('#in_description').val(Cookie_Description);
        $('#in_description').parent().find('.mdl-textfield__label').html('');
    }   

    if (Cookie_Tags) {
        $('#in_tags').val(Cookie_Tags);
        $('#in_tags').parent().find('.mdl-textfield__label').html('');
    }   
    
    if (Cookie_Manufacturer) {
        $('#in_manufacturer').val(Cookie_Manufacturer);
        $('#in_manufacturer').parent().find('.mdl-textfield__label').html('');
    }      
});

let imageFields = $('.imagefields');
let cOwnerFields = $('.co-owners');
let specFields = $('.specs');

function addImageField(content) {

    let d = document.createElement('div');
    $(d).addClass('imagefield');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');
    $(textField).css({ "width": "70%" });

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
    $(input).addClass('in_image');
    $(input).attr('type', 'text');

    if (content) {
        $(input).val(content);
    }

    let label = document.createElement('label');
    $(label).addClass('mdl-textfield__label');
    $(label).html('Image Link');

    let removeBtn = document.createElement('button');
    $(removeBtn).addClass('mdl-button');
    $(removeBtn).addClass('mdl-js-button');
    $(removeBtn).addClass('mdl-button--raised');
    $(removeBtn).addClass('mdl-js-ripple-effect');
    $(removeBtn).addClass('mdl-button--colored');
    $(removeBtn).html('remove');
    $(removeBtn).css({ "margin": "10px" });
    $(removeBtn).click(function () {
        $(d).slideToggle(200, function () {
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

function addCoOwner(content) {
    let d = document.createElement('div');
    $(d).addClass('ownerField');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');
    $(textField).css({ "width": "70%" })

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
    $(input).addClass('in_coowner');
    $(input).attr('type', 'text');
    $(input).attr('pattern', "7656119(\\d{10})");

    if (content) {
        $(input).val(content);
    }

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
    $(removeBtn).addClass('mdl-button--colored');
    $(removeBtn).html('remove');
    $(removeBtn).css({ "margin": "10px" });

    $(removeBtn).click(function () {
        $(d).slideToggle(200, function () {
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

function addSpec(content) {
    let d = document.createElement('div');
    $(d).addClass('specField');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');
    $(textField).css({ "width": "70%" })

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
    $(input).addClass('in_spec');
    $(input).attr('type', 'text');
    $(input).attr('pattern', "7656119(\\d{10})");

    if (content) {
        $(input).val(content);
    }

    let label = document.createElement('label');
    $(label).addClass('mdl-textfield__label');
    $(label).html('spec: value');

    let error = document.createElement('span');
    $(error).addClass('mdl-textfield__error');
    $(error).html('Input could not be parsed!');

    let removeBtn = document.createElement('button');
    $(removeBtn).addClass('mdl-button');
    $(removeBtn).addClass('mdl-js-button');
    $(removeBtn).addClass('mdl-button--raised');
    $(removeBtn).addClass('mdl-js-ripple-effect');
    $(removeBtn).addClass('mdl-button--colored');
    $(removeBtn).html('remove');
    $(removeBtn).css({ "margin": "10px" });

    $(removeBtn).click(function () {
        $(d).slideToggle(200, function () {
            d.remove();
        });
    });

    $(textField).append(input);
    $(textField).append(label);
    $(textField).append(error);

    $(d).append(textField);
    $(d).append(removeBtn);

    $(specFields).append(d);

    $(d).hide();
    $(d).slideToggle(200);

    componentHandler.upgradeDom();
}

$('#addimagelinks').click(function () { addImageField(); });
$('#addco-owner').click(function () { addCoOwner(); });
$('#addspec').click(function () { addSpec(); });

function TermsDialog() {
    let dialogButton = document.querySelector('#registerbutton');

    if (Cookie_Dialogue == 1) {
        dialogButton.onclick = registerData; //send registration data with this!
    }else{
        let dialog = document.querySelector('#terms');

        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        dialogButton.onclick = dialog.showModal;

        dialog.querySelector('button:not([disabled])')
            .addEventListener('click', function() {
            dialog.close();
            });

        let actionButtons   = $(dialog).find("button");
        let agreeButton     = $(actionButtons[0]);
        let disagreeButton  = $(actionButtons[1]);

        agreeButton.click(function(){ //send registration data with this!
            registerData();
            dialogButton.onclick = registerData; // Remove dialogue functionality from register button
        });

        disagreeButton.click(function(){ //should redirect or something we'll decide later
            dialog.close();
        });
    }

    Cookies.set('dialogue', 1);
    Cookie_Dialogue = 1;
}

$(document).ready(TermsDialog);

function createDataObject() {
    let data = {};

    data.name = document.getElementById("in_vehiclename").value;
    data.description = document.getElementById("in_description").value;

    data.region = document.getElementById("in_region") ? document.getElementById("in_region").value : "nothing";
    data.country = document.getElementById("in_country") ? document.getElementById("in_country").value : "nothing";

    let tags = document.getElementById("in_tags").value.split(/,/);
    data.tags = [];

    for (i in tags) {
        let tag = tags[i].trim().toLowerCase();
        
        if (data.tags.indexOf(tag) === -1) {
            data.tags.push(tag);
        }
    }

    data.images = [];
    data.coowners = [];

    for (i of document.getElementsByClassName("in_image")) {
        if (i.value.length > 0) {
            data.images.push(i.value);
        }
    }

    for (i of document.getElementsByClassName("in_coowner")) {
        if (i.value.length > 0) {
            data.coowners.push(i.value);
        }
    }

    return data;
}

const socket = io.connect('/');

function buttonTokenChange() {
    socket.emit("change_token", apikey);
}

function registerData() {
    let data = createDataObject();

    socket.emit("register_vehicle", data);
}

socket.on("register_error", errorData => {
    if (errorData.invalidSteamids) {
        for (id of errorData.invalidSteamids) {
            let textfields = $('.mdl-textfield');

            for (tf of textfields) {
                let firstChild = tf.firstChild;

                if (firstChild.value === id) {
                    firstChild.parentElement.className += ' is-invalid';

                    $(tf).find('.mdl-textfield__error').html('Given steamid does not correspond to existing account!');
                    $(tf).find('.mdl-textfield__input').change(function() {
                        $(this.parentElement).find('.mdl-textfield__error').html('Input is not a valid steamid!');
                    });
                }
            }
        }
    }

    if (errorData.name) {
        let element = $('#div_vehiclename');
        $(element).addClass('is-invalid');
    }

    if (errorData.region) {
        let element = $('#div_region');
        $(element).addClass('is-invalid');
    }  

    if (errorData.country) {
        let element = $('#div_country');
        $(element).addClass('is-invalid');
    }      
});
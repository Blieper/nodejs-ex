let imageFields = $('.imagefields');
let cOwnerFields = $('.co-owners');

function addImageField() {
    let d = document.createElement('div');
    $(d).addClass('imagefield');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
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

    $(removeBtn).click(function () {
        d.remove();
    });

    $(textField).append(input);
    $(textField).append(label);

    $(d).append(textField);
    $(d).append(removeBtn);

    $(imageFields).append(d);

    componentHandler.upgradeDom();
}

function addCoOwner() {
    let d = document.createElement('div');
    $(d).addClass('ownerField');

    let textField = document.createElement('div');
    $(textField).addClass('mdl-textfield');
    $(textField).addClass('mdl-js-textfield');

    let input = document.createElement('input');
    $(input).addClass('mdl-textfield__input');
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

    $(removeBtn).click(function () {
        d.remove();
    });

    $(textField).append(input);
    $(textField).append(label);
    $(textField).append(error);

    $(d).append(textField);
    $(d).append(removeBtn);

    $(cOwnerFields).append(d);

    componentHandler.upgradeDom();
}


$('#addimagelinks').click(addImageField);
$('#addco-owner').click(addCoOwner);


console.log(API);

function ToTable(dataArray) {
    html = '<table>';
    var len = dataArray.length;
    for (var i = 0; i < len; i++) {
        html += '<tr>';
        for (var key in dataArray[i]) {
            html += '<td>' + dataArray[i][key] + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

for (i in API) {

    // Get function from the API
    let func = API[i];

    // Create div, headers and description
    let d = document.createElement('div');
    $(d).attr('id', '_' + func.name);
    $(d).append('<h3>' + func.name + '</h3>');
    $(d).append('<p>' + func.description + '</p>');
    $(d).append('<h5>Parameters</h5>');

    // Create table
    let tab = document.createElement('table');
    $(tab).append('<thead>< tr ><th>Name</th> <th>Type</th> <th>Optional</th> </tr ></thead >');
    $(tab).attr('id', 'pars_' + func.name);
    $(tab).addClass('mdl-data-table');

    var tbody = document.createElement('tbody'),
        props = ["name", "type", "optional"];

    $(tab).append(tbody);
    $(d).append(tab);
    
    // Assign elements in table
    $.each(func.parameters, function (i, par) {
        var tr = document.createElement('tr');
        $(tr).addClass('mdl-data-table__cell--non-numeric');
        $.each(props, function (i, prop) {
            let val = par[prop];

            if (val === true || val === false) {
                val = val ? 'yes' : 'no';
            }

            var td = document.createElement('td');
            $(td).html(val).appendTo(tr);
        });

        tbody.append(tr);
    });

    // Seperator
    $(d).append("<hr>");
    $('#apipagecontent').append(d);

    $('#sidenav').append('<a class="mdl-navigation__link" href="#_' + func.name + '">' + func.name + '</a>');
}
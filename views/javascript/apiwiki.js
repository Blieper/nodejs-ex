

wiki = { queries: [] };

wiki.queries.push({
    head: 'randlicense',
    requires:
        ['host'],
    information:
        'Returns a random license based on the region of \'host\' and the current year.',
    examples:
        [
            'randlicense&host=spitsburg _r SP-18-3D7',
            'randlicense&host=Cre8ive%202.0 _r C8-18-634',     
            'randlicense&host=Vehicle%20Heaven _r VH-18-29A',                       
        ]
});

for (query in wiki.queries) {
    let q = wiki.queries[query];
    
    let d = document.createElement('div');

    $(d).attr('id', '_' + q.head);
    $(d).attr('id', '_' + q.head);
    $(d).append('<h3>' + q.head + '</h3>');
    $(d).append('<h5>Required parameters:</h5>');
    var list = '<ul><li>' + q.requires.join('</a></li><li>') + '</li></ul>';
    $(d).append(list);
    let split = q.information.split('\n');
    for (i in split) {
        $(d).append('</p>' + split[i] + '</p>');
    }

    for (i in q.examples) {
        let str = q.examples[i];
        let strsplit = str.split('_r');
        let string = "Query: " + strsplit[0]; 

        if (strsplit[1]) {
            string += '&#13&#13Result: ' + strsplit[1];
        }

        if (i != split.length - 1) {
            string += '&#13';
        }

        $(d).append('<pre class="prettyprint lang-html">' + string + '</pre>');
    }

    $(d).append("<hr>");
    $('#apipagecontent').append(d);

    $('#sidenav').append('<a class="mdl-navigation__link" href="#_' + q.head + '">' + q.head + '</a>');
}
function Main() {
    console.log("rdy");

    if (typeof pageFile != 'undefined') {
        // Loads the required page
        $("#page-content").load("/pages/" + pageFile + ".html");

        // Update MDL objects
        componentHandler.upgradeDom();
    }

}

$(document).ready(Main);

var tabmanager = new function () {
    this.queued = [];

    this.addTab = function (specs) {
        this.queued.push(specs);

        if ($('#div_tabholder').length) {
            this.addQueuedTabs();
        }
    };

    this.addQueuedTabs = function () {
        var tabbar = $('#div_tabholder');

        for (specs of this.queued) {
            let tab = $('<a></a>');
            $(tab).addClass('mdl-layout__tab');
            $(tab).attr('id','headertab_' + specs.name);
            $(tab).html(specs.name);

            if (specs.active) {
                $(tab).addClass('is-active');
            }

            $(tab).attr('href', specs.href);
            $('#div_tabholder').append(tab);
        }

        componentHandler.upgradeDom();
        this.queued = [];
    }

    this.removeTab = function (name) {
        if ($('#headertab_' + name).length) {
            $('#headertab_' + name).remove();
        }
    }

    this.addTitle = function () {
        $('.mdl-layout__header').append('<span class="mdl-layout-title">Garry\'s Mod Vehicle Database</span>');
    }
}

$(document).ready(function () {
    tabmanager.addQueuedTabs();
});

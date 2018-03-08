function Main() {
    console.log("rdy");

    if (pageFile != undefined) {
        // Loads the required page
        $("#page-content").load("/pages/" + pageFile + ".html");

        // Update MDL objects
        componentHandler.upgradeDom();
    }

}

$(document).ready(Main);
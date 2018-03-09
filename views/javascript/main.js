function Main() {

    // Update MDL objects
    componentHandler.upgradeDom();

    console.log("RDY");

    function LoadInnerHTML(pageFile,objectID) { // objectID: the object in which the html file will be loaded; optional* default: #page-content

        if (!pageFile) { return null; }
        objectID = objectID || "#page-content";
        // Loads the required page
        $(objectID).load("/pages/" + pageFile + ".html");

    }

    LoadInnerHTML(pageFile);

}

$(document).ready(Main);
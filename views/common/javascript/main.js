function Main() {

    console.log("RDY");

    function LoadInnerHTML(pageFile,objectID) { // objectID: the object in which the html file will be loaded; optional* default: #page-content
        if (pageFile == null) {return}
        
        objectID = objectID || "#page-content";
        // Loads the required page
        $(objectID).load("/pages/" + pageFile + ".html");
    }

    LoadInnerHTML(pageFile);

    // Removes any script used to predefine variables, like 'pageFile' and 'user'
    // This means the client won't see those ugly scripts :ok_hand:
    $(".predef").remove();

    // Update MDL objects
    componentHandler.upgradeDom();

    pageFile = undefined;
}

$(document).ready(Main);
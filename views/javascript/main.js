function Main() {
    console.log("rdy");
    componentHandler.upgradeDom();
    $("#page-content").load("/pages/register.html")
}

$(document).ready(Main);
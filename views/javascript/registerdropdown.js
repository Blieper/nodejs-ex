// Request regions from server
socket.emit("request_registerdata",null);

socket.on("get_registerdata", data => {
    // Apply regions

    console.log(data.countries);

    $('#in_region').immybox({
        choices: data.regions,
    });   

    $('#in_country').immybox({
        choices: data.countries,
        maxResults: 206
    });  
});
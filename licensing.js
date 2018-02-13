let symbolRegex = /[\\\^\$\*\+\?\.\(\)\:\;\!\|\,\.\[\]\{\}\-\_\=\+\'\"\&\%\#\@/]/g;
let digitRegex = /(\d([\.\,]\d+)*)$/g

function generateServerIdentifier (serverName) {
    if (serverName.search(symbolRegex) > -1) {
        serverName = serverName.substring(0,serverName.search(symbolRegex));
    }

    serverName.trim();

    let exploded = serverName.split('_');
    let returnName = '';

    if (exploded.length > 1 && exploded.length < 4) {
        for (let i = 0; i < exploded.length; i++) {
            returnName += exploded[i][1];
        }
    }else{
        returnName = serverName.substring(0,3);
    }

    return returnName;
}


function toHex(d) {
    let str = Number(d).toString(16).toUpperCase();

    return "0".repeat(4 - str.length) + str;
}

exports.generateLicenseCode = function (serverName) {
    serverName = serverName.replace(symbolRegex,"");
    serverName = serverName.replace(digitRegex,"");

    let remainingDigits = 0;
    let testName        = serverName;
    let digits          = '';

    while (testName.search(/\d/g)) {
        remainingDigits++;
        digits += testName[testName.search(/\d/g)];
        testName = testName.substring(testName.search(/\d/g) + 1);
    }

    let serverIdentifier = generateServerIdentifier(serverName);
    let returnName = serverIdentifier;

    if (remainingDigits <= 2) {   
        if (remainingDigits == 2) {
            returnName += Digits
        } else if (remainingDigits == 1) {
            returnName = serverIdentifier.substring(0,2) + Digits
        } else {
            returnName = serverIdentifier.substring(0,3)
        }
    }

    returnName += '-';
      
    year = (new Date()).getFullYear().toString();
        
    returnName += year.substring(year.length - 2);    
    returnName += '-';

    // Generate random string
  
    returnName += toHex(Math.floor(Math.random()*65535));

    return returnName.toUpperCase();
}

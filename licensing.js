let symbolRegex = /[\\\^\$\*\+\?\.\(\)\:\;\!\|\,\.\[\]\{\}\-\_\=\+\'\"\&\%\#\@/]/g;
let digitRegex = /(\d([\.\,]\d+)*)$/g

function generateServerIdentifier (serverName) {
    if (serverName.search(symbolRegex) > -1) {
        serverName = serverName.substring(0,symbolRegex.search(serverName));
    }

    serverName.trim();

    let exploded = serverName.split('_');
    let returnName = '';

    if (exploded.length > 1 && exploded.length < 4) {
        for (let i = 0; i < exploded.length; i++) {
            returnName += exploded[i][1];
        }
    }else{
        returnName = serverName.substring(0,2);
    }

    return returnName;
}


function toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

exports.generateLicenseCode = function (serverName) {
    serverName = serverName.replace(symbolRegex,"");
    serverName = serverName.replace(digitRegex,"");

    let remainingDigits = 0;
    let testName        = serverName;
    let digits          = '';

    while (/\d/g.test(testName)) {
        remainingDigits++;
        digits += testName[/\d/g.search(testName)];
        testName = testName.subString(/\d/g.search(testName) + 1);
    }

    let serverIdentifier = generateServerIdentifier(serverName);
    let returnName = serverIdentifier;

    if (remainingDigits <= 2) {   
        if (remainingDigits == 2) {
            returnName += Digits
        } else if (remainingDigits == 1) {
            returnName = serverIdentifier.substring(0,1) + Digits
        } else {
            returnName = serverIdentifier.substring(0,2)
        }
    }

    returnName += '-';
      
    year = (new Date).getFullYear().toString();
        
    returnName += year.substring(year.length - 2);    
    returnName += '-';

    // Generate random string
  
    returnName += toHex(Math.floor(Math.random()*65535));

    return ReturnName.toUpperCase();
}

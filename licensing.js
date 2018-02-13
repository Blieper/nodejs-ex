let symbolRegex = /[\\\^\$\*\+\?\.\(\)\:\;\!\|\,\.\[\]\{\}\-\_\=\+\'\"\&\%\#\@/]/g;
let digitRegex = /(\d([\.\,]\d+)*)$/g

function generateServerIdentifier (serverName) {
    if (serverName.search(symbolRegex) > -1) {
        serverName = serverName.subString(0,symbolRegex.search(serverName));
    }

    serverName.trim();

    let exploded = serverName.split('_');
    let returnName = '';

    if (exploded.length > 1 && exploded.length < 4) {
        for (let i = 0; i < exploded.length; i++) {
            returnName += exploded[i][1];
        }
    }else{
        returnName = serverName.subString(0,2);
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

    if (RemainingDigits <= 2) {   
        if (RemainingDigits == 2) {
            ReturnName += Digits
        } else if (RemainingDigits == 1) {
            ReturnName = ServerIdentifier.subString(0,1) + Digits
        } else {
            ReturnName = ServerIdentifier.subString(0,2)
        }
    }

    ReturnName += '-';
      
    Year = (new Date).getFullYear().toString();
        
    ReturnName += Year.subString(Year.length() - 2);    
    ReturnName += '-';

    // Generate random string
        
    RandomNum       = Math.floor(Math.random()*65535);
    StringifiedNum  = toHex(RandomNum);
    
    ReturnName += StringifiedNum

    return ReturnName.toUpperCase();
}

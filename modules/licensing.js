let symbolRegex = /[\\\^\$\*\+\?\.\(\)\:\;\!\|\,\.\[\]\{\}\-\_\=\+\'\"\&\%\#\@/]/g;
let digitRegex = /(\d+([\.\,]\d+)*)$/g

function generateServerIdentifier (serverName) {
    if (serverName.search(symbolRegex) > -1) {
        serverName = serverName.substring(0,serverName.search(symbolRegex));
    }

    serverName.trim();

    let exploded = serverName.split(' ');
    let returnName = '';

    if (exploded.length > 1 && exploded.length < 3) {
        for (let i = 0; i < exploded.length; i++) {
            returnName += exploded[i][0];
        }
    }else{
        returnName = serverName.substring(0,2);
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
    serverName = serverName.trim();

    let remainingDigits = 0;
    let testName        = serverName;
    let digits          = '';

    while (testName.search(/\d/g) > -1) {
        remainingDigits++;
        digits += testName[testName.search(/\d/g)];
        testName = testName.substring(testName.search(/\d/g) + 1);
    }

    let serverIdentifier = generateServerIdentifier(serverName);
    let returnName = serverIdentifier;

    if (remainingDigits <= 1) {   
        if (remainingDigits == 2) {
            returnName = serverIdentifier.substring(0,1) + digits
        } else if (remainingDigits == 1) {
            returnName = serverIdentifier.substring(0,1) + digits
        } else {
            returnName = serverIdentifier.substring(0,2)
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

exports.generateUniqueLicense = function (region, testLicense, app, callback) {
    // get database
    let dbo = app.db.db('sampledb');

    console.log('License: ' + testLicense);

    // try to find 'testToken'
    dbo.collection('vehicles').findOne({ license: testLicense }, { _id: 0, license: 1 }, function (err, result) {
        if (err) throw err;

        if (result) {
            // tested token exists, try to make a new one
            console.log('Found existing token!')
            testLicense = exports.generateLicenseCode(region);

            exports.generateUniqueLicense(testLicense, callback);
        } else {
            console.log('Made unique license!')

            // tested token is unique; fire callback with the new token
            callback(testLicense);
        }
    });
}

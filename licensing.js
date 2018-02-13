let symbolRegex = /[\\\^\$\*\+\?\.\(\)\:\;\!\|\,\.\[\]\{\}\-\_\=\+\'\"\&\%\#\@/]/g;
let digitRegex = /(\d([\.\,]\d+)*)$/g

function generateServerIdentifier (serverName) {
    if (symbolRegex.search(serverName) > -1) {
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

/*
    function string generateLicenseCode (Region:string) {
        local ServerName = Region 
        
        ServerName = ServerName:replaceRE("[,<>.;:'\"/?\|{}()]","")
        ServerName = ServerName:replaceRE("%d-$","")
        
        RemainingDigits = 0
        
        TestName = ServerName
        Digits = ""
        
        while (TestName:findRE("%d")) {
            RemainingDigits++    
            Digits += TestName[TestName:findRE("%d")]        
            TestName = TestName:sub(TestName:findRE("%d") + 1)
        }
          
        ServerIdentifier = generateServerIdentifier(ServerName)
        
        ReturnName = ServerIdentifier
     
        if (RemainingDigits <= 2) {   
            if (RemainingDigits == 2) {
                ReturnName += Digits
            }elseif (RemainingDigits == 1) {
                ReturnName = ServerIdentifier:sub(1,2) + Digits
            }else{
                ReturnName = ServerIdentifier:sub(1,3)
            }
        }
        
        ReturnName += "-"
       
        Year = date()["year",number]:toString()
        
        ReturnName += Year:sub(Year:length() - 1)     
        ReturnName += "-"
      
        # Generate random string
        
        RandomNum = randint(1,65535)
        StringifiedNum = toBase(RandomNum,16)
        
        StringifiedNum = "0":repeat(4 - StringifiedNum:length()) + StringifiedNum
        
        ReturnName += StringifiedNum
    
        return ReturnName:upper()
    }

    function string generateServerIdentifier (ServerName:string) {
        
        FindString = "[,<>.;:'%\"/?%|{}-%[%]%(%)]%:%;"
        
        if (ServerName:findRE(FindString)) {
            ServerName = ServerName:sub(1,ServerName:findRE(FindString) - 1)
        }
            
        ServerName = ServerName:trim()
        
        Exploded = ServerName:explode(" ")
        
        ReturnName = ""
        
        if (Exploded:count() > 1 && Exploded:count() < 4) {
            for (I = 1 , Exploded:count()) {
                ReturnName += Exploded[I,string][1]
            }
        }else{
            ReturnName = ServerName:sub(1,3) 
        }
        
        return ReturnName
    }
        
*/
//take input as text 

var inputText = "Create a Circle with 30pixel width";
//var inputText = "Create a Rectangle";

var skeletonText = "Create a <!shapeType!> with <!measure!> width";

//process skeletonText and convert it to pattern matcher
function populatePattern(skeletonText) {
    var pattern = '';
    var txtArr = skeletonText.split(' ');
    //    console.log(txtArr);
    var pattKeys = [];
    var resObj = {};
    var re1 = '(<)'; // Any Single Character 1
    var re2 = '(!)'; // Any Single Character 2
    var re3 = '(.*)'; // Non-greedy match on filler
    var re4 = '(!)'; // Any Single Character 3
    var re5 = '(>)';

    resObj['data'] = {};
    console.log(txtArr);
    var scCount = 0;
    for (var txt in txtArr) {
        
        console.log(txt);
        var pObj = txtArr[txt];
        var regex = re1 + re2 + re3 + re4 + re5;
        var p = new RegExp(regex, ["i"]);
        var m = p.exec(pObj);
        if (m != null) {
            var key = m[3];
            var keyIndex = parseInt(txt) + 1 + scCount;
            pattern[p] = "(.*)"

            resObj['data'][key] = keyIndex;
            pattKeys.push(key);
            pattern = pattern + '(.*)';
        } else {
            pattern = pattern + '(' + txtArr[txt] + ')';
        }

        if (txtArr.length - 1 != txt) {
            pattern = pattern + '(\\s+)';
        }
        
        scCount++;
    }

    resObj['pattern'] = pattern;
    resObj['pattKeys'] = pattKeys;

    return resObj;
}

function processMatcher(inputText, pattern, positionValue) {
    console.log(inputText);
    console.log(pattern);
    var retObj = "";
    var txt = inputText;
    //    var p = new RegExp("'" + pattern + "'", ["i"]);
    var p = new RegExp(pattern, ["i"]);
    var m = p.exec(txt);
    if (m != null) {
        //    var word1 = m[1];
        //    var ws1 = m[2];
        var word2 = m[positionValue];
        console.log(word2);
        retObj = word2;
        //    document.write("(" + word2.replace(/</, "&lt;") + ")" + "(" + ws1.replace(/</, "&lt;") + ")" + "\n");
    } else {
        console.log('NOT MATCHING');
    }
    
    return retObj;
}

var result_pattern = populatePattern(skeletonText)
console.log(result_pattern);
//console.log('(Create)(\\s+)(a)(\\s+)(.*)');
//console.log(result_pattern['pattern']);
var finalKVPair = {};
for (var dIndex in result_pattern['pattKeys']) {
    var keyName = result_pattern['pattKeys'][dIndex];
    var positionValue = result_pattern['data'][keyName];
    var pattMatched = processMatcher(inputText, result_pattern['pattern'], positionValue);
    finalKVPair[keyName] = pattMatched;
}
//processMatcher(inputText, '(Create)(\\s+)(a)(\\s+)(.*)');
console.log(finalKVPair);
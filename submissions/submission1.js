'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumLoss function below.
function minimumLoss(price) {
    
    const size = price.length;
    var priceSorted = [];
    var result = 0;
    var minimum = 0;

    for(var i = 0; i < size; i++)
    {
        priceSorted.push({'id':i, 'value':price[i]});
    }
    priceSorted.sort(function(a, b){return b.value-a.value});

    for(var j = 0; j < priceSorted.length-1; j++)
    {
        if(priceSorted[j].id < priceSorted[j+1].id)
        {
            result = priceSorted[j].value - priceSorted[j+1].value;
            if(minimum == 0 || result < minimum)
            {
                minimum = result;
            }
        }
    }

    return minimum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}

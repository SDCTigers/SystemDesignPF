const fs = require('fs'), 
readline = require('readline')
path = require('path');

const data = [];

let rd = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname,"files/photos.csv")),
    console: false
});

rd.on('line', function(line) {
    data.push(line);
    //console.log(line);
});

rd.on("close", function(line) {
    console.log(data.length);
}); 

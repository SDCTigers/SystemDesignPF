const csv = require('csv');
const path = require('path');
const loader = csv(); 

function featuresCSV(Fone, Ftwo, Fthree, Ffour) {
    this.id = Fone;
    this.styleId = Ftwo;
    this.size = Fthree;
    this.quantity = Ffour;
}; 

let featuresData = [];

loader.from.path(path.join(__dirname,"files/related.csv")).to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        featuresData.push(new featuresCSV(data[index][0], data[index][1], data[index][2], data[index][3]));
    }
    console.log(featuresData);
});
console.log("loading");
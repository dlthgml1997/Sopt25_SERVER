// npm install csvtojson
const csv = require('csvtojson');

csv().fromFile('./csv2json.csv').then((jsonArr) => {
    if(!jsonArr){
        console.log(`file read arr : ${err}`);
        return;
    }
    console.log(jsonArr);
}, (err) => {
    console.log(`err with readCSV : ${err}`);
})
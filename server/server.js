const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg');
const pgp = require('pg-promise')();
const Promise = require("bluebird");

const app = express()
const port = 3000

const pool = {
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'student',
  port: 5432,
}
const db = pgp(pool);

// app.use(express.static("./client/dist"));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Hello World!')
});
app.get('/products/:product_id', (req, res) => {
    let id = req.params.product_id;
    let start = new Date().getTime();
    db.any(`SELECT * FROM product WHERE id = ${id}`)
        .then(results => {
            let mainData = results[0];
            let features = mainData.features;
            let fPromises = [];
            for (let i = 0; i < features.length; i++) {
                fPromises.push(db.any(`SELECT * FROM features WHERE featureid = ${features[i]}`));
            }
            Promise.all(fPromises)
                .then(array => {
                    let features = [];
                    for (let i = 0; i < array.length; i++) {
                        features.push({feature: array[i][0].feature, value: array[i][0].material});
                    }
                    mainData.features = features;
                    delete mainData.styles;
                    res.statusCode = 200;
                    res.send(mainData);
                    let end = new Date().getTime();
                    console.log(end-start , " milliseconds")
                })
            
        })

});

app.get('/products/:product_id/related', (req, res) => {
    let id = req.params.product_id;
    let start = new Date().getTime();
    db.any(`SELECT * FROM related WHERE product_id = ${id}`)
        .then(data => {
            res.statusCode = 200;
            res.send(data[0].relateditems);
            let end = new Date().getTime();
            console.log(end-start , " milliseconds")
        })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
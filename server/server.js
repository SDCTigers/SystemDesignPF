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

app.get('/products/list', (req, res) => {
    let time0 = new Date().getTime();
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    let start = (page-1)*count+1;
    let end = parseInt(start)+parseInt(count);
    let lPromises = [];
    for(let i = start; i < end; i++) {
        lPromises.push(db.any(`SELECT id, name, slogan, description, category, default_price FROM product WHERE id = ${i}`));
    }
    Promise.all(lPromises)
        .then(array => {
            results = []
            for (let i = 0; i < array.length; i++) {
                results.push(array[i][0]);
            }
            res.statusCode = 200;
            res.send(results); 
            let time1 = new Date().getTime();
            console.log(time1-time0 , " milliseconds")
        })
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

app.get('/products/:product_id/styles', (req, res) => {
    let id = req.params.product_id;
    let start = new Date().getTime();
    db.any(`SELECT * FROM product WHERE id = ${id}`)
        .then(results => {
            let mainData = results[0];
            let styles = mainData.styles;
            let sPromises = [];
            for (let i = 0; i < styles.length; i++) {
                sPromises.push(db.any(`SELECT id as style_id, name, original_price, sale_price, default_style, skus, photos FROM styles WHERE id = ${styles[i]}`));
            }
            Promise.all(sPromises)
                .then(array => {
                    let styles = [];
                    for (let i = 0; i < array.length; i++) {
                        let style = array[i][0];
                        if (style.sale_price === -1) {
                            style.sale_price = 0;
                        }
                        style.sale_price = JSON.stringify(style.sale_price);
                        style.original_price = JSON.stringify(style.original_price);
                        style["default?"] = style.default_style;
                        delete style.default_style;
                        styles.push(style);
                    }
                    res.statusCode = 200;
                    res.send({product_id: id, results: styles});
                    let end = new Date().getTime();
                    console.log(end-start , " milliseconds")
                })
            
        })

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
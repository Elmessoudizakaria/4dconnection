const express = require('express');
const bodyParser = require('body-parser');
const connecteur = require('./connecteur');

const PORT = 4001;
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('SERVER IS RUNNING .....');
// });

app.post('/sync/client', (req, res) => {
    const client = req.body;
    let query = `INSERT INTO Client `;
    let queryParm = '(';
    let queryValues = '(';
    Object.keys(client).map(id => {
        queryParm += id + `,`;
        if (typeof (client[id]) == 'string') {
            queryValues += `'` + client[id] + `',`;
        } else {
            queryValues += client[id] + `,`;
        }

    });


    query += queryParm.slice(0, -1) + `) values ` + queryValues.slice(0, -1) + `)`;
    console.log('query insertion ', query);
    connecteur.queryExecuter(query, (err) => {
        if (err !== null) {
            res.json({
                success: false,
                msg: err.message
            });
        } else {
            res.json({
                success: true
            })
        }
    });
    res.json({
        success: true
    })

});

app.get('/client', (req, res) => {
    const userQuery = `Select * from Client`;
    connecteur.queryExecuter(userQuery, (err, data) => {
        console.log(!data ? 'NO DATA' : 'DATA RECEIVED');
        res.json({
            success: true,
            data
        });

    });
})
app.post('/user', (req, res) => {
    const userQuery = `INSERT INTO Table_1 (name,age) values('${req.body.name}',${req.body.age})`;
    console.log(userQuery);
    connecteur.queryExecuter(userQuery, (data) => {
        console.log('query return : ', data);
        res.json({
            success: true,
            msg: 'coool'
        });

    });

});
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
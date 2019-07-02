const express = require('express');
const bodyParser = require('body-parser');
const connecteur = require('./connecteur');
const PORT = 4001;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('SERVER IS RUNNING .....');
});
app.get('/user',(req,res)=>{
    const userQuery = 'SELECT * FROM Table_1';
    connecteur.queryExecuter(userQuery,(data)=>{
        console.log(data);
        res.json(data);
    });
})
app.post('/user',(req,res)=>{
    const userQuery = `INSERT INTO Table_1 (name,age) values('${req.body.name}',${req.body.age})`;
    connecteur.queryExecuter(userQuery,(data)=>{
        console.log(data);
        res.json(data);
    });
    
});
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
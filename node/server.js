const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'weezy995',
      database : 'bio-data'
    }
  });

// db.select('*').from('info').then(data => {
//     console.log(data);
//     // res.json(data)
// });

app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req,res) => {
    // const { firstname } = req.body;
    // db.select('*').from('info').where({
    //     firstname: firstname
    // }).then(data => {
    //     if(data.length){
    //         res.json(data[0]);
    //     }else {
    //         res.status(400).send("data not found")      
    //     }
    // }).catch(err => res.status(400).json('error getting data'))
    db.select('*').from('info').then(data => {
        res.json(data)
    });
})




const PORT = process.env.port || 3010; 
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
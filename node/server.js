const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan')

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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/data', (req, res) => {

    db.select('*').from('info').then(data => {
        res.json(data)
    });
})

app.post('/', (req, res) => {

  db('info').returning('*').insert({
        firstname: req.body.firstname,
        surname: req.body.surname,
        dob: req.body.dob,
        age: req.body.age
      }).then(data => {
        console.log(data)
        res.json(data)
      }).catch(err => res.status(400).json('unable to post'))
})


app.delete('remove/:id', (req, res) => {
  var id = req.params.id;
  // db('info').returning('*')
  // .where({id:req.params.id})
  // .del()
  console.log(id)
})





const PORT = process.env.port || 3010; 
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
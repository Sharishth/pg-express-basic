const express = require('express')
const app = express()
const port = 3000
///
var dude
const {Client} = require('pg')
const connectionString = 'postgresql://localhost:5432/postgres'
const client = new Client({
  connectionString,
  user: 'postgres',
  password: 'safexpress',
})
client.connect()
client.query('SELECT * FROM sample_tbl', (err, res) => {
    // `SELECT * FROM sample_tbl WHERE name=${dude}` --- for adavanced query with external variables
  //console.log(res.rows)
  var rowGet = res.rows
  var fieldNm = res.fields
  //const column1 = Object.values(rowGet[0]);
  dude = Object.values(rowGet[0])[1]
  client.end()
})
///
app.get('/', (req, res) => {
    var input_user = "B"
    if (input_user==dude){
        res.send('Hello '+ dude)
    }
    else
        res.send('Wrong ID')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
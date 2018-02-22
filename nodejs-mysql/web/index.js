const mysql = require('mysql');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Connect to mysql
var connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'password',
  database: 'demodb'
});


// Attempt to catch disconnects 
connectionPool.on('connection', function (connection) {
  console.log('DB Connection established');
  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

// Context root
app.get('/', (req, res) => {
  res.send("<h2>Congrats It's working ! </h2><h1>Demo for node back-end service with mysql DB as storage</h1><br><h2>List of Services</h2><ul><li>HTTP GET - http://minikube.local/api/customers - get list of customers</li> <li>HTTP POST - http://minikube.local/api/customers - add customer</li>  </ul> <h2> See attached postman collection for testing.</h2>");
});

// GET Customers
app.get('/api/customers', (req, res) => {
  connectionPool.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) {
      res.send('ERROR ' + JSON.stringify(err));
    } else {
      res.send({ rows: result });
    }
  });
});

// ADD Customer
app.post('/api/customers', (req, res) => {
  var custName = req.body.name;
  var custAddress = req.body.address;
  let params = { name: custName, address: custAddress };
  connectionPool.query('INSERT INTO customers SET ?', params, (err, result, fields) => {
    if (err) {
      res.send('ERROR ' + JSON.stringify(err));
    } else {
      res.send('customer ID: ' + result.insertId + ' Inserted');
    }
  });
});

// start express server
app.listen(8080, () => console.log('Web app listening on port 8080!'));
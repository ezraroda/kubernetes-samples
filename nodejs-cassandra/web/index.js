var cassandra = require('cassandra-driver');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Connect to the cassandra cluster
var client = new cassandra.Client({ contactPoints: ['cassandra'], keyspace: 'demodb' });

// Context root
app.get('/', (req, res) => {
  res.send("<h2>Congrats It's working ! </h2><h1>Demo for node back-end service with Cassandra DB as storage</h1><br><h2>List of Services</h2><ul><li>HTTP GET - http://minikube.local/api/customers - get list of customers</li> <li>HTTP POST - http://minikube.local/api/customers - add customer</li>  </ul> <h2> See attached postman collection for testing.</h2>");
});

// GET Customers
app.get('/api/customers', (req, res) => {
  client.execute("SELECT * FROM customers", function (err, result) {
    if (!err) {
      res.send({ rows: result.rows });
    } else {
      res.send('ERROR ' + JSON.stringify(err));
    }
  });
});

// ADD Customer
app.post('/api/customers', (req, res) => {
  var custName = req.body.name;
  var custAddress = req.body.address;
  client.execute('INSERT INTO customers (id, username, address) VALUES (uuid(), ' + "'" + custName + "'" + ' , ' + "'" + custAddress + "'" + ' ) IF NOT EXISTS', function (err, result) {
    if (!err) {
      res.send((result.rowLength || '') + ' Record Inserted');
    } else {
      res.send('ERROR ' + JSON.stringify(err));
    }
  });
});


function exitHandler(options, err) {
  //if (options.cleanup) console.log('clean');
  if (err) console.log(err.stack);
  if (options.exit) {
    client.shutdown().then(() => { console.log('exit'); }, (err) => { console.log('exit'); });
    process.exit();
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { exit: true, cleanup: true }));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// catches "kill pid" 
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

// start express server
app.listen(8080, () => console.log('Web app listening on port 8080!'));
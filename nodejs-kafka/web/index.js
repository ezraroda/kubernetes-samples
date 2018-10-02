const express = require('express');
var bodyParser = require('body-parser');
var Kafka = require('no-kafka');
var serveStatic = require('serve-static')


var Producer = Kafka.Producer;
var SimpleConsumer = Kafka.SimpleConsumer;

var kafkaProducer, kafkaConsumer;

var TOPIC_NAME = "nodejs-topic";

var KAFKA_BROKER_HOST = process.env.KAFKA_SERVICE_HOST || 'localhost';
var KAFKA_BROKER_PORT = process.env.KAFKA_SERVICE_PORT || '9092';

var KAFKA_BROKER_IP = `${KAFKA_BROKER_HOST}:${KAFKA_BROKER_PORT}`;






const globalConnectionOptions = { connectionString: KAFKA_BROKER_IP };

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(serveStatic('www', {'index': ['index.html', 'default.html', 'default.htm']}));


var _customers = [];

function kafkaConnect(attempt) {
  try {


    console.log(`KAFKA_BROKER_IP: ${KAFKA_BROKER_IP}`);
    kafkaProducer = new Producer(globalConnectionOptions);
    
    console.log(`KAFKA_BROKER_IP 1 : ${KAFKA_BROKER_IP}`);
    
    kafkaProducer.init().then(
      (client) => {
        console.log(`KAFKA_BROKER_IP_CONNECTED >>>> ${KAFKA_BROKER_IP}`);

        console.log("Producer created");
        kafkaConsumer = new SimpleConsumer(globalConnectionOptions);
        kafkaConsumer.init().then(
          () => {
            console.log("Consumer created");



            kafkaConsumer.commitOffset([{ topic: TOPIC_NAME, partition: 0, offset: 0 }]).then(() => {

              _customers = []; // clear old data , we're fetching all

              kafkaConsumer.subscribe(TOPIC_NAME, 0, { time: Kafka.EARLIEST_OFFSET },
                (messageSet) => {

                  messageSet.forEach(function (m) {
                    _customers.push(JSON.parse(m.message.value.toString('utf8')));
                  });
                }
              );


            });






          },
          () => {
            console.log("Consumer NOT created");

          }
        );

      },
      (err) => {
        console.log("Error creating Producer");
      }
    );

  }
  catch (e) {
    console.log("Exception in initializeKafkaProducer" + JSON.stringify(e));
    console.log("Try again in 5 seconds");
    setTimeout(kafkaConnect, 5000, ++attempt);
  }
}


// Context root
// app.get('/', (req, res) => {



//   res.send("");
// });

// GET Customers
app.get('/api/customers', (req, res) => {
  res.send(`{ "customers" : ${JSON.stringify(_customers)} }`);
});


// ADD Customer
app.post('/api/customers', (req, res) => {
  // publish to kafka
  kafkaProducer.send({
    topic: TOPIC_NAME,
    partition: 0,
    message: {
      value: JSON.stringify(req.body)
    }
  }).then(
    (result) => {
      res.send(`Record Inserted ${JSON.stringify(result)} with data:  ${JSON.stringify(req.body)}`);
    },
    (err) => {
      res.send('ERROR ' + JSON.stringify(err));
    }

  );
});


function exitHandler(options, err) {
  if (options.cleanup) console.log('clean');
  if (err) console.log(err.stack);
  if (options.exit) {
    Promise.all([
      kafkaProducer.end(),
      kafkaConsumer.end()
    ]).then(() => { console.log('exit'); }, (err) => { console.log('exit'); });
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



// kafka client connect

kafkaConnect(1);

// start express server
app.listen(8080, () => console.log('Web app listening on port 8080!'));
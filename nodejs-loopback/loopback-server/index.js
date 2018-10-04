const application = require('@loopback/dist-util').loadDist(__dirname);

module.exports = application;

if (require.main === module) {
  // Run the application
  application.main({
    rest: {
      port: 8080
    }
  }).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

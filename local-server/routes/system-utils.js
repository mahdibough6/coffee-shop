var express = require('express');
var router = express.Router();
const child_process = require('child_process');
const qz = require('qz-tray');

/* GET users listing. */
router.get('/shutdown', function (req, res, next) {
  console.log('hi');
  child_process.exec('shutdown -s -t 0', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Shutting down');
    }
  });
});
router.get('/hi', function (req, res) {
  res.send("hi");
})
  router.get('/print', (req, res) => {
    const printerName = 'POS-80C';

    // Hard-coded content to print
    const content = '<h1>Hello, world!</h1>';
  
    // Print the content using QZ Tray
    qz.printers.find()
    .then((printers) => {
      // Send the list of printers to the client
      res.send(printers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error getting printer list');
    });
});
module.exports = router;

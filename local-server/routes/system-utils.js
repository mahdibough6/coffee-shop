var express = require('express');
var router = express.Router();
const child_process = require('child_process');

/* GET users listing. */
router.get('/shutdown', function (req, res) {
  console.log('hi');

 /* child_process.exec('shutdown -s -t 0', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Shutting down');
    }
  });*/
});
module.exports = router;

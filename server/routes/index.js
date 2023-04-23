const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// Read all files in the 'routes' folder, excluding 'index.js'
const routeFiles = fs.readdirSync(__dirname).filter((file) => file !== 'index.js');

// Iterate over each route file and import the router
routeFiles.forEach((file) => {
  const routeName = file.slice(0, -3);
  const routePath = `/${routeName}`;
  const route = require(path.join(__dirname, file));

  router.use(routePath, route);
});

module.exports = router;


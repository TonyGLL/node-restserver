require('./config/config');
require('./connection');

const express = require('express');
const path = require('path');

const app = express();

const routes = require('./routes/index');

// Settings
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enabled PUBLIC FILE
app.use(express.static(path.resolve(__dirname, '../public')));

// Gloabl Routes Config
app.use(routes);

// Active Server Verification
app.listen(process.env.PORT, () => {

    console.log('Server on PORT:', process.env.PORT);
});

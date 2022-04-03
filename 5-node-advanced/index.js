// DEBUGGERS
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

//CONFIGS
const config = require('config');

// EXPRESS
const express = require('express');
const app = express();

// MIDDLEWARE IMPORTS
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middlewares/logger');

// TEMPLATE ENGINE
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(express.json());
app.use(logger);
app.use(express.static('public'));
app.use(helmet());

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/', require('./routes/home'));

// Configuracion
console.log('App name: ', config.get('name'));
console.log('Mail server: ', config.get('mail.host'));
console.log('Mail password: ', config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}

// debugger
startupDebugger('App initialized');
dbDebugger('Connected to the Database');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

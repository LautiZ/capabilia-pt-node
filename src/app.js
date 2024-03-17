const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const config = require('./config');

const series = require('./modulos/series/rutas')
const error = require('./red/errors')

const app = express()

// Configuración CORS
app.use(cors());

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuracion
app.set('port', config.app.port);

// rutas
app.use('/api/series', series);
app.use(error);

module.exports = app;
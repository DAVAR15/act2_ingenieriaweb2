const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./api/routes/userRoute');
const genreRoute = require('./api/routes/genreRoute');
const directorRoute = require('./api/routes/directorRoute');
const producerRoute = require('./api/routes/producerRoute');
const typeRoute = require('./api/routes/typeRoute');
const mediaRoute = require('./api/routes/mediaRoute');

const app = express();

// Middlewares Globales
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rutas Base Centrales Administrativas
app.use('/api/users', userRoute);
app.use('/api/genres', genreRoute);
app.use('/api/directors', directorRoute);
app.use('/api/producers', producerRoute);
app.use('/api/types', typeRoute);

// Ruta Maestra de Media
app.use('/api/media', mediaRoute);

// Handler Ruta No Encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Endpoint no encontrado' });
});

// Handler de Errores Global (N-Capas)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Error Interno del Servidor'
  });
});

module.exports = app;

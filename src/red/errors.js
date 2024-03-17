const respuestas = require('./respuestas')

function errors(err, req, res, next) {
    console.log('[error ', err);

    const message = err.message || 'Error interno!';
    const status = err.status || 500;

    respuestas.error(req, res, message, status)
}

module.exports = errors;
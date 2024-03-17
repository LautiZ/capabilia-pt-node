const express = require('express');
const respuestas = require('../../red/respuestas');

const controlador = require('./controlador');

const router = express.Router();

router.get('/', all_intervals);
router.get('/:id', single_interval);
router.post('/', add_interval);
router.put('/', delete_interval);

async function all_intervals(req, res, next) {
    try {
        const items = await controlador.all_intervals();
        respuestas.success(req, res, items, 200);
    } catch(err) {
        next(err);
    }
};

async function single_interval(req, res, next) {
    try {
        const items = await controlador.single_interval(req.params.id);
        respuestas.success(req, res, items, 200);
    } catch(err) {
        next(err);
    }
};

async function add_interval(req, res, next) {
    try {
        const items = await controlador.add_interval(req.body);
        if (req.body.id == 0){
            message = 'Item agregado con exito!'
        } else {
            message = 'Item editado con exito!'
        }
        respuestas.success(req, res, message, 201);
    } catch(err) {
        next(err);
    }
};


async function delete_interval(req, res, next) {
    try {
        const items = await controlador.delete_interval(req.body);
        respuestas.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch(err) {
        next(err);
    }
};

module.exports = router;
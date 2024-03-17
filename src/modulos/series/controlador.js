const db = require('../../DB/mysql')

const TABLA = 'tv_series_intervals';

function all_intervals() {
    return db.all_intervals(TABLA)
}

function single_interval(id) {
    return db.single_interval(TABLA, id)
}

function add_interval(body) {
    return db.add_interval(TABLA, body)
}

function delete_interval(body) {
    return db.delete_interval(TABLA, body)
}


module.exports = {
    all_intervals,
    single_interval,
    add_interval,
    delete_interval,
}
const mysql = require('mysql2')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.batabase,
};

let conection;

function mysqlConection() {
    conection = mysql.createConnection(dbconfig);

    conection.connect((err) => {
        if(err) {
            console.log('[db_error]: ', err);
            setTimeout(mysqlConection, 200)
        } else {
            console.log('Conexion exitosa!');
        };
    });

    conection.on('error', err => {
        console.log('[db_error]: ', err);
        if(err.code === 'PROTOCOL_CONECTION_LOST') {
            mysqlConection();
        } else {
            throw err;
        };
    });
};

mysqlConection();

function all_intervals(table) {
    return new Promise((resolve, reject) => {
        conection.query(`
            SELECT 
                tvs.id AS tv_series_id, 
                tvs.title AS tv_series_title, 
                tvi.id AS tv_interval_id,
                tvi.week_day, 
                tvi.show_time 
            FROM ${table} tvi 
            JOIN tv_series tvs ON tvi.tv_series_id = tvs.id;
        `, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};



function single_interval(table, id) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

function insert_interval(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

function edit_interval(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

function add_interval(table, data) {
    if (data && data.id == 0) {
        return insert_interval(table, data);
    } else if (data.id != 0) {
        return edit_interval(table, data);
    };
};

function delete_interval(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

module.exports = {
    all_intervals, 
    single_interval, 
    add_interval, 
    delete_interval,
}
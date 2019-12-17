const mysql = require('promise-mysql');

//import mysql from 'promise-mysql';
//import keys from './keys';

const key = require('./key');

//mysql.createConnection
const db = mysql.createPool(key.database);

db.getConnection()
    .then(connection =>{
        db.releaseConnection(connection);
        console.log('DB has connected');
    });

module.exports = db;
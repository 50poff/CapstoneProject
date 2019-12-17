

//console.log("Does this happen?");
const key = {
    database: {
        host: process.env.DB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'DaiHire'
    }
}

module.exports = key;
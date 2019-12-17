//only Administrator have access
const pool = require('../db');


//GET Request Handler
const getRole = (req, res) => {
    if (req.user.role_name.includes("Administrator")) {

        let sql = 'select * from Role';

        pool.query(sql).then((rows) => {
            res.status(200).send(rows);

        });
    }
    else {
        res.send(401);
    }
};


module.exports = {
    getRole

}
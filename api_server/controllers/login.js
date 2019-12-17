const pool = require ('../db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const loginUser = (req, res) => {
    res.status(200).json( req.user ); 
}

const encrypt =(req, res) =>{
    let sql = "select people_id, p_password FROM People WHERE people_id ="+req.params.userid;
    pool.query(sql).then(rows =>{
        let password = rows[0].p_password;
        let id = rows[0].people_id;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password,salt);
        // write a query to replace a plaintext password with a hash of that password
        sql= "UPDATE People set p_password='" + hash + "' WHERE people_id=" + id;
        pool.query(sql).then(rows=>{
            res.status(200).json(rows);
        }).catch(err=>{
            res.send(500);//.json({error:"sql update from people error"});
        });
    }).catch(err=>{
       res.send(500);//.json({error:"sql select from people error"});
    });

}
passport.use(new BasicStrategy(
    (email, password, done) => {
    //To Do:Need to encrypt their password before we can query the db
    // This is the modified verison that group concatenates all of the roles into one cell!
    let sql = "SELECT People.p_password, People.is_active, People.people_id, first_name, last_name, email, group_concat(Role.role_name) as 'role_name' FROM People INNER JOIN PeopleRoles ON People.people_id = PeopleRoles.people_id INNER JOIN Role ON PeopleRoles.Role_id = Role.role_id WHERE People.is_active = 1 AND email = '" + email + "' GROUP BY people_id";
        pool.query(sql).then((rows)=>{
            user = rows[0];
            hash = rows[0].p_password;
            let res = bcrypt.compareSync(password,hash);
            if(res === true){
                user ={
                    is_active:user.is_active,
                    people_id:user.people_id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email,
                    role_name:user.role_name
                };
                return done(null,user);
            }
            else{
                return done(null,null);
            }
        }).catch(err=>{
            return done(null,null);
        });
    }
));

module.exports = {
    loginUser,
    encrypt
};

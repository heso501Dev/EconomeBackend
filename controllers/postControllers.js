const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {newUser, loginuser} = require('../models/logiReg');

// Register new user
const register = (req, res)=>{
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    newUser(email, password, userName, (err, rows) =>{
        if(err){
            res.status(500).send('Internal Server Error');
        } else {
            res.send(rows);
        }
    })

}


module.exports = {
    register, 
    login: loginuser, // refrence to the loginuser
};
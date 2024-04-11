const db = require("../config/database"),
     passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     bcrypt = require("bcrypt");


// Register new user
const newUser = async (email, password, username, callback) => {
    try {
        let user = await db.query(`
            BEGIN TRANSACTION;
            LET  $p = create user content {"email" : "${email}","password" :"${password}","username":"${username}"};
            RETURN $p.id;
            COMMIT TRANSACTION;`
        );
        console.log(user)
        console.log("sad")
        return callback(null, 'ok');
    } catch (err) {
        console.log(err);
        return callback(err);
    }
};

// Login user
passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        console.log("sad")
        try {  
        const ro = await db.query(`
            BEGIN TRANSACTION;
            let $a = SELECT * FROM user WHERE email = "${username}";
            let $hash = array::first($a.password);
            LET $pass = "${password}";
            RETURN crypto::argon2::compare($hash,$pass);
            COMMIT TRANSACTION;
        `)
        console.log(ro)
        if  (ro){
            return done(null, user);
        }else{
            return done(null, false);
        }
        } catch(e){
            return done(null, false, { message: "User not found" });
        };
    } catch (err) {
        console.log("mad")
        return done(err);
    }
}));

// Export the loginuser function
const loginuser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Handle internal server error
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            console.log(user)
            // Handle authentication failure
            return res.status(401).json({ message: 'Authentication failed', info });
        }
        // Manually log in the user
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Handle successful login
            //return res.json({ message: 'Login successful', user });
            return res.redirect('/profile');
        });
    })(req, res, next);
};



module.exports = {newUser, loginuser};

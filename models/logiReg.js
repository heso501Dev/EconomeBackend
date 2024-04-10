const db = require("../config/database"),
     passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     bcrypt = require("bcrypt");


// Num of salt rounds
const saltRound = 10;

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

// Export the loginuser function
const loginuser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Handle internal server error
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
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

// Login user
passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        // Check if the email exists
        console.log(username)
        const ro = await db.query(`SELECT * FROM user WHERE email = $1`, [username]);
        console.log(ro)
        // If the email exists
        if (ro.rows.length > 0) {
            const user = ro.rows[0];
            // Extract the hashed password
            const storedHashedPassword = user.password;

            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                if (err) {
                    return done(err);
                } else {
                    // case password match
                    if (valid) {
                        return done(null, user);
                    } else {
                        // case password didn't match
                        return done(null, false);
                    }
                }
            });
        } else { // If the email doesn't exist
            return done(null, false, { message: "User not found" });
        }
    } catch (err) {
        return done(err);
    }
}));



module.exports = {newUser, loginuser};

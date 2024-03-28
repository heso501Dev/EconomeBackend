const db = require("../config/database"),
     passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     bcrypt = require("bcrypt");


// Num of salt rounds
const saltRound = 10;

// Register new user
const newUser = async (email, password, username, callback) => {
    try {
        // Check if the email already exists
        const checkEmail = await db.query(`SELECT * FROM "User" WHERE email = $1`, [email]);

        // If the email already exists
        if (checkEmail.rows.length > 0) {
            return callback(null, "Email already exists. Try logging in.");
        } else {
            // Hash password
            bcrypt.hash(password, saltRound, async (err, hash) => {
                if (err) {
                    return callback(err);
                } else {
                    // Insert values in db
                    try {
                        await db.query(`INSERT INTO "User" (email, password, username) VALUES ($1, $2, $3)`, [email, hash, username]);
                        return callback(null, 'ok');
                    } catch (insertErr) {
                        console.error("Error inserting user: ", insertErr);
                        return callback(insertErr);
                    }
                }
            });
        }
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
        const ro = await db.query(`SELECT * FROM "User" WHERE email = $1`, [username]);

        // If the email exists
        if (ro.rows.length > 0) {
            const user = ro.rows[0];
            // Extract the hashed password
            const storedHashedPassword = user.password;

            // Compare the provided password with the stored hashed password
            await bcrypt.compare(password, storedHashedPassword, (err, valid) => {
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
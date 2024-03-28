const express = require('express'),
      app = express(),
      cors = require('cors'),
      port = process.env.PORT || 3000,
      getReq = require('./routes/getReq'),
      postReq = require('./routes/postReq'),
      session = require('express-session'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

// Middlware
app.use(
    session({
      secret: 'key',
      resave: false,
      saveUninitialized: true,
      cookie: {
          maxAge: 1000*60*60*24,
          }
    })
  );

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', getReq);
app.use('/api', postReq);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})

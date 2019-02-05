const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/user')
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true })


const app = express();

app.use(
    cookieSession({
        //30 days, 24 hour in a day, 60 minutes, 60 seconds, 1000 ms
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);




const PORT = process.env.PORT || 3300;
app.listen(PORT);


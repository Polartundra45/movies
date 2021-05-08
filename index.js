if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

//dependencies 

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localPassport = require('passport-local');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');

//routes

const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

const User = require('./models/user');

const AppError = require('./utils/AppError');

// CONNECTING TO MONGO

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/newDB';

mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', () => {
    console.log('db connected');
});

const secret = process.env.SECRET || 'notagoodsecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret 
    }
});

store.on('error', function (e) {
    console.log('session store error');
})

const sessionConfig = {
    name: 'movieSession',
    store,
    secret,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

//session and flash need to come before passport uses

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash middleware needs to come after passport uses

app.use((req, res, next) => {
    res.locals.signedInUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(helmet({ contentSecurityPolicy: false }));

app.use('/movies', movieRoutes);
app.use('/movies/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'/views'));

app.get('/', (req, res) => {
    res.render('home');
});

// ERROR HANDLING MIDDLEWARE

app.all('*', (req, res, next) => {
    next(new AppError('PAGE NOT FOUND', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message){
        err.message = 'SOMETHING WENT WRONG';
    }
    res.status(statusCode).render('error', { err })
});

// PORT
 
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('server is live');
});
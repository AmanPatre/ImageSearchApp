const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
// const cookieSession = require('cookie-session'); // DELETE THIS LINE
const session = require('express-session'); // ADD THIS LINE

dotenv.config();

// REQUIRE MODELS
require('./models/User');
require('./models/Search');

// REQUIRE SERVICES
require('./services/passport');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- REPLACE THE COOKIE-SESSION BLOCK ---
/*
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [process.env.COOKIE_KEY],
  })
);
*/
// --- WITH THIS EXPRESS-SESSION BLOCK ---
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
// --- END OF REPLACEMENT ---

app.use(passport.initialize());
app.use(passport.session());

// REQUIRE ROUTES
require('./routes/authRoutes')(app);
require('./routes/searchRoutes')(app);

app.get('/', (req, res) => {
  res.send('Hello from the UD Studios Internship Server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
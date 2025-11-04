const passport = require('passport');
const authController = require('../controllers/authController');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    authController.googleCallback
  );

  app.get('/api/logout', authController.logout);

  app.get('/api/current_user', authController.getCurrentUser);
};
exports.googleCallback = (req, res) => {
  // Point back to the frontend
  res.redirect('http://localhost:3000/dashboard'); 
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    // Point back to the frontend
    res.redirect('http://localhost:3000/'); 
  });
};

exports.getCurrentUser = (req, res) => {
  res.send(req.user);
};
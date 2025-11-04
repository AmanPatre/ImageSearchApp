const searchController = require('../controllers/searchController');
const isLoggedIn = require('../middlewares/isLoggedIn');

module.exports = app => {
  app.post('/api/search', isLoggedIn, searchController.searchImages);
  
  app.get('/api/history', isLoggedIn, searchController.getSearchHistory);
  
  app.get('/api/top-searches', searchController.getTopSearches);
};
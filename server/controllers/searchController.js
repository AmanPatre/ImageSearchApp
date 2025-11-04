const mongoose = require('mongoose');
const axios = require('axios');
const Search = mongoose.model('searches');

const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';

exports.searchImages = async (req, res) => {
  const { term } = req.body;
  
  if (!term) {
    return res.status(400).send({ error: 'Search term is required' });
  }

  try {
    // 1. Log the search in our database
    const search = new Search({
      term,
      _user: req.user.id,
      timestamp: Date.now()
    });
    await search.save();

    // 2. Call the Unsplash API
    const response = await axios.get(UNSPLASH_BASE_URL, {
      params: { 
        query: term, 
        per_page: 20 
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    // 3. Send results back to the client
    res.send(response.data.results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error processing your search' });
  }
};

exports.getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $group: { _id: '$term', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, term: '$_id', count: 1 } }
    ]);
    res.send(topSearches);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching top searches' });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const history = await Search.find({ _user: req.user.id })
                                .sort({ timestamp: -1 })
                                .limit(20);
    res.send(history);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching search history' });
  }
};
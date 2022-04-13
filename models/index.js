const User = require('./User');
//const Movie = require('./Movie');
//const StreamingService = require('./StreamingService');
//const MovieList = require('./MovieList');
//const MovieStreamer = require ('./MovieStreamer');

// Movie.belongsTo(MovieList, {
//   foreignKey: 'movie_id', 
//   constraints: false
// })

// MovieList.hasMany(Movie, {
//   foreignKey: 'movie_id',
//   constraints: false
// })

//Movie.belongsToMany(User, { through: MovieList});
//User.belongsToMany(Movie, {through:MovieList});

//Movie.belongsToMany(StreamingService, {through: MovieStreamer});
//StreamingService.belongsToMany(Movie, {through: MovieStreamer});


// MovieList.hasMany(Movie);
// // Movie.belongsTo(MovieList, {
// //   foreignKey: 'movie_id',
// //   constraints: false
// // });



module.exports = { User, /*Movie, StreamingService, MovieList, MovieStreamer*/ };
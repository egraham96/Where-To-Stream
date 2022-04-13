const sequelize = require('../config/connection');
const { User, /*Movie, StreamingService, MovieList, MovieStreamer */} = require('../models');

const userData = require('./user.json');
//TODO const movieData = require('./movie.json');
//TODO const serviceData = require('./streamingService.json');
//TODO const movieStreamerData = require('./movieStreamer.json');
//TODO const movieListData = require('./movieList.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //seed the user table
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  /*seed the movie table
  const movies = await Movie.bulkCreate(movieData, {
    individualHooks: true, 
    returning: true,
  });
  //seed the streaming services table
  const services = await StreamingService.bulkCreate(serviceData, {
    individualHooks: true,
    returning: true,
  });
  //seed the movie list table to assingn movies to users
  const movieLists = await MovieList.bulkCreate(movieListData, {
    individualHooks: true,
    returning: true,
  });
  //seed the moviestreamer table to assign movies to streaming svc
  const streamList = await MovieStreamer.bulkCreate(movieStreamerData, {
    individualHooks: true,
    returning: true,
  });*/
  process.exit(0);
};

seedDatabase();
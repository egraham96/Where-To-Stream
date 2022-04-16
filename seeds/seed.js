const sequelize = require('../config/connection');
const { User, Media, StreamingList, MediaList} = require('../models');

const userData = require('./user.json');
const mediaData = require('./media.json');
const streamingOptions = require('./streamingList.json');
const mediaListData = require('./mediaList.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //seed the user table
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  //seed the movie table
  const medias = await Media.bulkCreate(mediaData, {
    individualHooks: true, 
    returning: true,
  });
  //seed the streaming options table
  const streaminglinks = await StreamingList.bulkCreate(streamingOptions, {
    individualHooks: true,
    returning: true,
  });
  //seed the movie list table to assingn movies to users
  const medialists = await MediaList.bulkCreate(mediaListData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();
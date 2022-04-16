const User = require('./User');
const Media = require('./Media');
const StreamingList = require('./StreamingList');
const MediaList = require('./MediaList');


Media.belongsTo(MediaList, {
foreignKey: 'media_id', 
constraints: false
})

MediaList.hasMany(Media, {
foreignKey: 'media_id',
constraints: false
})

Media.belongsToMany(User, { through: MediaList});
User.belongsToMany(Media, {through: MediaList});

Media.belongsTo(StreamingList, {
    foreignKey: 'media_id', 
    constraints: false
    })

StreamingList.hasOne(Media, {
    foreignKey: 'media_id',
    constraints: false
    })



module.exports = { User, Media, StreamingList, MediaList }
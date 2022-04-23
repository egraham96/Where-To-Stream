const User = require('./User');
const Media = require('./Media');
const StreamingList = require('./StreamingList');
const MediaList = require('./MediaList');



StreamingList.hasOne(Media, {
    foreignKey: 'media_id',
    constraints: false
})

Media.belongsTo(StreamingList, {
    foreignKey: 'media_id',
    constraints: false
})

Media.belongsToMany(User, {
        through: MediaList,
        unique:false,
        foreignKey: 'media_id'
});


User.belongsToMany(Media, {
    through: MediaList,
    unique:false,
    foreignKey: 'user_id'
});


MediaList.hasMany(Media, {
    foreignKey: 'media_id',
    constraints: false
})

Media.belongsTo(MediaList, {
    foreignKey: 'media_id',
    constraints: false
})

User.belongsTo(MediaList, {
    foreignKey:'user_id',
    constraints:false
})

MediaList.hasMany(User, {
    foreignKey: 'user_id',
    constraints:false
})





module.exports = { User, Media, StreamingList, MediaList}
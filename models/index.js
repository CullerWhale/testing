const Sleep = require('./Sleep');

const User = require('./User');

const Tag = require('./Tag');

const SleepTag = require('./SleepTag');

// Sleep belongs to User
Sleep.belongsTo(User, {
    foreignKey: 'user_id'
});

// User will have many Sleeps
User.hasMany(Sleep, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Sleep belongs to many Tags
Sleep.belongsToMany(Tag, {
    through: SleepTag,
    foreignKey: 'sleep_id'
});

// Tag belongs to many Sleeps
Tag.belongsToMany(Sleep, {
    through: SleepTag,
    foreignKey: 'tag_id'
});

module.exports = { 
    Sleep,
    User, 
    Tag,  
    SleepTag};
const { User } = require('../models');

const userData = [
    {
        username: 'Dolo',
        email: 'klnusftly@gmail.com',
        password: 'abc123ABC!'

    },
    {
        username: 'Betty',
        email: 'bettywhite@gmail.com',
        password: 'abc123ABC!'

    },
    {
        username: 'Cullers',
        email: 'imblueimblue@doobie.com',
        password: 'abc123ABC!'

    },
    {
        username: 'Barb',
        email: 'iCutMyOwnHair@ucutit.com',
        password: 'abc123ABC!'

    }
    
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
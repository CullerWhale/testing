const { Tag } = require('../models');

const tagData = [
    {
        tag_name: 'nightmare'
    },
    {
        tag_name: 'lucid'
    },
    {
        tag_name: 'teeth'
    },
    {
        tag_name: 'stress'
    },
    {
        tag_name: 'bubblegum'
    },
    {
        tag_name: 'restless'
    },
    {
        tag_name: 'restful'
    },
    {
        tag_name: 'family'
    },
    {
        tag_name: 'realistic'
    }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
const { SleepTag } = require('../models');

const sleepTagData = [
    {
        sleep_id: 1,
        tag_id: 1
    },
    {
        sleep_id: 2,
        tag_id: 2
    },
    {
        sleep_id: 3,
        tag_id: 3
    },
    {
        sleep_id: 4,
        tag_id: 4
    },
];

const seedSleepTags = () => SleepTag.bulkCreate(sleepTagData);

module.exports = seedSleepTags;
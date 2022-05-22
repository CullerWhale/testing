const { Sleep } = require('../models');

const sleepData = [
    {
        title: 'I dream of bubblegum',
        sleep_description: 'I slept restfully.',
        hours_slept: 3.5,
        dream_sw: true,
        dream_description: 'I had a dream of gum in my hair and shaved it off',
        user_id: 3,
    },
    {
        title: 'Zombies Invade',
        sleep_description: 'I slept like a rock and woke up in a panic.',
        hours_slept: 6,
        dream_sw: true,
        dream_description: 'Zombies were very teethy and tried to eat me.',
        user_id: 2,
    },
    {
        title: 'I had a dream that I was floating',
        sleep_description: 'I woke up when I flew through the roof',
        hours_slept: 9,
        dream_sw: true,
        dream_description: '',
        user_id: 4,
    },
    {
        title: 'Crazy Chef',
        sleep_description: 'Delightful dream. I slept more than I should have.',
        hours_slept: 12,
        dream_sw: false,
        dream_description: '',
        user_id: 1,
    },
    
];

const seedSleep = () => Sleep.bulkCreate(sleepData);

module.exports = seedSleep;
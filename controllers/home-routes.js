const router = require('express').Router();
const { Sleep, SleepTag, User, Tag } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const sleepData = await Sleep.findAll({
            attributes: [
                'title',
                'sleep_description',
                'hours_slept',
                'dream_sw',
                'dream_description'
            ],
            include: [
                {
                   model: User,
                   attributes:['username'] 
                },
                {
                    model: Tag,
                    attributes:['tag_name'],
                }
            ]

        });

        const sleep = await sleepData.map(post => post.get({plain: true}));
        res.render('homepage', { sleep, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/signup', (req, res) => {
    res.render('signup', { loggedIn: req.session.loggedIn });
});

router.get('/create-sleep', withAuth, (req,res) => {
    Tag.findAll({})
    .then(tagData =>{
        const tag = tagData.map(post => post.dataValues); //use post.get({plan:true})) it gets rid of other stuff
        res.render('createSleep', { tag, loggedIn: req.session.loggedIn });
    })
});

// router.get('/sleep/:tag_name', withAuth, (req,res) => {

router.get('/sleep/:tag_name', (req,res) => {
    Tag.findOne({
        where: {
            tag_name: req.params.tag_name
        }, 
        include: [
            {
                model: Sleep,
                attributes: [
                    'title',
                    'sleep_description',
                    'hours_slept',
                    'dream_sw',
                    'dream_description',
                    // user_id: req.session.user_id wrong because user who is logged in not who posted
                ],
                include: [
                    {
                        model: User, 
                        attributes: [
                            'username'
                        ]
                    }
                ]
            }
        ]

    })
    .then(tagSleepsData =>  {
        const tagSleeps = tagSleepsData.get({plain: true});
        //send data back
        res.json(tagSleeps);
    })
})
//connect to front end now. 
module.exports = router;
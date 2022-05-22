const router = require('express').Router();
const { User, Sleep, Tag, SleepTag } = require('../../models');

// create GET route to get all sleep entries
router.get('/', async (req, res) => {
    try {
        const sleepData = await Sleep.findAll({
            attributes: { exclude: ['updatedAt']},
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Tag,
                    attributes: ['tag_name']
                }
            ]
        });
        res.status(200).json(sleepData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create GET route to get one sleep entry
router.get('/:id', async (req, res) => {
    try {
        const sleepData = await Sleep.findByPk(req.params.id, {
            include: [
                {
                    model: Tag,
                    attributes: ['tag_name']
                }
            ]
        });

        if(!sleepData) {
            res.status(404).json({Message: 'No entry found with that id!'});
            return;
        }

        res.status(200).json(sleepData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create POST route to post sleep entry
router.post('/', (req, res) => {
    Sleep.create({
        title: req.body.title,
        sleep_description: req.body.sleep_description,
        hours_slept: req.body.hours_slept,
        dream_sw: req.body.dream_sw,
        dream_description: req.body.dream_description,
        user_id: req.session.user_id,
        tagIds: req.body.tagIds 
    })
    .then((sleep) => {
    // if there's sleep tags, we need to create pairings to bulk create in the SleepTag model
    if (req.body.tagIds.length) {
        const sleepTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
                sleep_id: sleep.id,
                tag_id,
            };
        });
        return SleepTag.bulkCreate(sleepTagIdArr);
    }
    // if no sleep tags, just respond
    res.status(200).json(sleep);
    })
    .then((sleepTagIds) => res.status(200).json(sleepTagIds))
    .catch((err) => {
    console.log(err);
    res.status(400).json(err);
    });
});


// Update Sleep
router.put('/:id', (req, res) => {
    // update product data
    Sleep.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
    // find all associated tags from SleepTag
    return SleepTag.findAll({ where: { sleep_id: req.params.id } });
    })
    .then((sleepTags) => {
    // get list of current tag_ids
    const sleepTagIds = sleepTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newSleepTags = req.body.tagIds
        .filter((tag_id) => !sleepTagIds.includes(tag_id))
        .map((tag_id) => {
            return {
                sleep_id: req.params.id,
                tag_id,
            };
        });
    // figure out which ones to remove
    const sleepTagsToRemove = sleepTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

    // run both actions
        return Promise.all([
            SleepTag.destroy({ where: { id: sleepTagsToRemove } }),
            SleepTag.bulkCreate(newSleepTags),
        ]);
    })
    .then((updatedSleepTags) => res.json(updatedSleepTags))
    .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
    });
});

module.exports = router;
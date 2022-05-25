const router = require('express').Router();
const { Tag, Sleep, SleepTag } = require('../../models');

// create GET route to get all tags
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include:
        [{
          model: Sleep, SleepTag,
          attributes: ['title', 'sleep_description']
        }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Sleep data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:
        [{
          model: Sleep, SleepTag,
          attributes: ['title', 'sleep_description']
        }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/tag', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    const tagFiltered = tagData.filter(tag => {
      if (tag.tag_name == req.body.tag_name) {
        return true
      } else {
        return false
      }
    })
    if (tagFiltered.length > 0) {
      res.json({ Message: "This tag already exists" })
    } else {
      await Tag.create({
        tag_name: req.body.tag_name
      })
    }
    res.json({ Message: "Tag successfully created" })
  } catch (error) {
    res.json(error)
  };
}
)


module.exports = router;
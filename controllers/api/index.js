const router = require('express').Router();

const userRoutes = require('./user-routes');
const sleepRoutes = require('./sleep-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/sleep', sleepRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
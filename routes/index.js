const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// sends wrong route message to undefined routes
router.use((req, res) => res.send('wrong route'));

module.exports = router;
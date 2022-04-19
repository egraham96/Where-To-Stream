const router = require('express').Router();
const userRoutes = require('./user-routes');
const mediaRoutes = require('./media-routes');
//const streamRoutes = require('./stream-routes')

router.use('/users', userRoutes);
router.use('/mylist', mediaRoutes);
//router.use('/stream', streamRoutes)


module.exports = router;
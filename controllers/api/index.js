const router = require('express').Router();
const userRoutes = require('./user-routes');
const mediaRoutes = require('./media-routes');

router.use('/users', userRoutes);
router.use('/mylist', mediaRoutes);


module.exports = router;
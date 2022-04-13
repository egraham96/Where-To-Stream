const router = require('express').Router();
const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes');

router.use('/users', userRoutes);
router.use('/mylist', movieRoutes);


module.exports = router;
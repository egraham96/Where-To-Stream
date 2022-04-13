const router = require('express').Router();
const {
    User,
    /*Movie, MovieList, MovieStreamer, StreamingService*/
} = require('../../models');
//const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    if (req.session.logged_in) {
        res.render('homepage', {
            logged_in: req.session.logged_in,
        })
        res.render('login')
    }
});
module.exports = router;
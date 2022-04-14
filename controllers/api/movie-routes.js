const router = require('express').Router();
const {
    User,
    /*Movie,
    MovieList,
    MovieStreamer,
    StreamingService*/
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async(req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,

    })
})

router.post('/', withAuth, async(req, res) => {
    try {
        console.log(req.title)
        console.log(req.image_link)
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const {
    User,
    Media,
    MediaList,
    /*StreamingList*/
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async(req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,

    })
})

router.post('/', withAuth, async(req, res) => {
    try {
        console.log(req.body.title)
        console.log(req.body.image_link)
        response.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
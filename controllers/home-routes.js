const router = require('express').Router();

router.get('/', async(req, res) => {
    if (req.session.logged_in) {
        res.redirect('/api/mylist');
    }

    res.render('homepage')

});

router.get('/signup', async(req, res) => {
    res.render('signup');
});

router.get('/search', async (req, res) => {
    res.render('search', {
        logged_in: req.session.logged_in,
    }
)})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login')
});

module.exports = router;
const router = require('express').Router();
const { User, MediaList, Media /*StreamingService*/ } = require('../models');
const withAuth = require('../utils/auth');
//const path = require('path');
//const { where } = require('sequelize/types');

router.get('/', async(req, res) => {
    if (req.session.logged_in) {
        res.redirect('/api/mylist');
    }

    res.redirect('/login')

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
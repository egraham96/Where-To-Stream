const router = require('express').Router();
const {User,Media,MediaList, /*StreamingList*/} = require('../../models');
const withAuth = require('../../utils/auth');


//Render a user's entire watchlist 
router.get('/', withAuth, async (req, res) => {
  console.log(`in media routes get / user id ${req.session.user_id}`);
  
  try {

    const userData = await User.findByPk(req.session.user_id);
    const user= userData.get( {plain: true});
    console.log(user);

    const mediaData = await userData.getMedia();
    const medias = mediaData.map((media) => media.get({ plain: true }));
    console.log(medias);

    res.render('watchlist', { 
      logged_in: req.session.logged_in,
      medias: medias, 
      user: user,

    });
    console.log('finished render')

  } catch (err) {
    res.status(500).json(err);
  }

});

//Add a tv show or movie to user's watchlist
router.post('/', withAuth, async(req, res) => {
  console.log(`in media routes post / user id ${req.session.user_id} title ${req.body.title}`);
  try {
      const mediaData = await Media.create({
        title: req.body.title,
        type: req.body.type,
        image: req.body.image_link,
        average_rating: req.body.rating,
        watchmode_id: req.body.watchmode_id,
        imdb_id: req.body.imdb_id
      });

  //Sanitize media data
  const media = mediaData.get({ plain: true});

  //Add to user's MediaList (Sequelize through table)
  const mediaListData = await MediaList.create({
      media_id: media.id, 
      user_id: req.session.user_id
    });
    req.session.save(() => {
      req.session.user_id = mediaListData.user_id;
      req.session.logged_in = true;

    });

  } catch (err) {
    res.status(400).json(err)
  }
  
  res.render('watchlist',{
    logged_in: req.session.logged_in,
    });
})


//Get info about one movie or tv show from user's watchlist
router.get('/:id', withAuth, async (req, res) => {
  console.log(`in media routes get :id / user id ${req.session.user_id}`);
  
  try {
    const mediaData = await Media.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!mediaData) {
      res.status(404).json({ message: 'No media found with this id!' });
      return;
    }

    const serializedData=mediaData.get( {plain: true});
    console.log(serializedData)
    res.status(200).json(serializedData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  //Delete a movie or tv show from user's watchlist
  router.delete('/:id', withAuth, async(req, res) => {
    console.log(`in media routes delete :id/ user id ${req.session.user_id}`);
    console.log(req.params.id)
      try {
        const mediaData = await Media.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!mediaData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
        res.status(200).json(mediaData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

//Get info about one movie or tv show from user's watchlist
router.put('/:id', withAuth, async (req, res) => {
  console.log(`in media routes put :id / user id ${req.session.user_id}`);
  console.log(req.params.id)
  let content=""
  if (req.body.addreview){
  content=req.body.addreview
  }
  else if (req.body.editreview){
  content=req.body.editreview}
  else {content=""}
  

  try {
  const myList= await MediaList.findOne(
    {
      where: {
        user_id: req.session.user_id,
        media_id: req.params.id
      }
    }
  );
console.log(myList.id)

  if (!myList) {
    res.status(404).json({ message: 'No MediaList found with this media id!' });
    return;
  }
  
  const updatedList= await MediaList.update(
    {
      review: content
    },
    {
      where: {
        id: myList.id
      },
    }
  );
 
  console.log(updatedList)
  res.status(200).json(updatedList)
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
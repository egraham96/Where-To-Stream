const router = require('express').Router();
const {StreamingList, User, Media} = require('../../models');
const withAuth = require('../../utils/auth');



//Returns streaming links for a tv show or movie that has been added to logged in user's watchlist
router.get('/:id', withAuth, async (req, res) => {
    console.log(`in stream routes get :id / user id ${req.session.user_id}`);
    
    try {
        const streamingData = await StreamingList.findAll({
          where: {
            media_id: req.params.id,
          },
          order: [
            ['type', 'DESC']
          ],
          raw:true,});

        const media= await Media.findOne({
            attributes: ['title', 'type', 'image', 'average_rating'],
            where: {
              id: req.params.id
            },
            raw:true
        });

        const user= await User.findOne({
            attributes: ['user_name'],
            where: {
                id: req.session.user_id
            },
            raw:true
        })
    
        if (!streamingData) {
          res.status(404).json({ message: 'No Streaming Lists found with this media_id!' });
          return;
        }

        if (!media) {
            res.status(404).json({ message: 'No Media data found with this media_id!' });
            return;
          }

        if (!user){
            res.status(404).json({ message: 'No user data found with this req.session.user_id!' });
            return;
          }
    
        res.render('stream',{
        logged_in: req.session.logged_in,
        user: user,
        media: media,
        links: streamingData,
      });
      console.log(streamingData)
      console.log('finished render in stream routes get :id')
  
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  

//Creates a StreamingList model from a movie or tv show from a user's watchlist and adds model to db
router.post('/:id', withAuth, async (req, res) => {
  console.log(`in stream routes post :id / user id ${req.session.user_id}`);
  let newArray=[]
  req.body.subServiceList.forEach(value => {newArray.push(value)})
  //console.log(newArray)
  
  try {
    const StreamListData = await StreamingList.bulkCreate(newArray, {
      ignoreDuplicates: true,
    });
    

    req.session.save(() => {
    req.session.logged_in = true;
    console.log('Sending Response Ok');
    res.status(200).json(StreamListData);

  });

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}})

module.exports = router;
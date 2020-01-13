const express = require('express');
const router  = express.Router();
const Articles = require('../models/articles');


//method select all

router.get('/all', async (req, res) =>{
    try{
        const post = await Articles.find();
        res.json(post);
    }
    catch(err){
        res.json({ message: err});
    }
});


//method findById
router.get('/:postid', async (req, res) =>{
    try{
        const post = await Articles.findById(req.params.postid);
        res.json(post)
    }catch(err){
        res.json({ message: err});
    }
});

//method delete
router.delete('/:postid', async (req, res) => {
    try{
    const post = await Articles.remove({ _id: req.params.postid})
    res.json(post)
    } catch(err){
        res.json({ message: err})
    }
});

//method post
router.post('/post', async (req, res) =>
{
    const post = new Articles({
        title: req.param('title'),
        description: req.param('description')
    });
    //save to database and res to json
    try{
        const savedPost = await post.save();
        res.redirect('/articles/all');
        res.json(savedPost);
    } catch (err){
            res.json({ message: err});
    }
});

//method update
router.patch('/:idpost', async (req, res) => {
    try{
        const update = await Articles.updateOne({ _id: req.params.idpost},{ $set:{ title: req.body.title }});
        res.json(update);
    }
    catch(err){
        res.json({ message: err});
    }
});


//simple

router.get('/', ( req, res) =>{
    res.send('halaman index');
})




module.exports = router;
const express = require('express');
const { connectToDB } = require('../mongo');


const router = express.Router();

router.get('/', async (req, res) => {
    const {db} = await connectToDB();
    try {
       const a = await db.collection('products').find().toArray();
       console.log('ldskjldkjdsl', a);
    } catch(error) {
        console.log(error);
    }

    res.render('index')
})

router.post('/contact', async (req, res) => {
    const {email, message} = req.body;
    const {db} = await connectToDB();
    const data = await db.collection('products').find().toArray();
    console.log(email, message, data);

    //once upload to database 
    res.status(200).json({
        status: "OK",
        message: "message has been sent."
    })
})

router.get('/privacy', (req, res) => {
    res.render('privacy', {user: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'})
})


router.get('/closewindow', (req, res) => {
    console.log('browsee is closing')
    
    res.end();
})

module.exports = router;
const express = require("express");
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    /**
     * @userid get it form cookie who logged in
     */
    res.render('dashboard/index', {
        user: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
        page: 'dashboard',
        data: [
            {
                name: 'Bucket One',
                id: 'bucket-1-id',
            },
            {
                name: 'Bucket Two',
                id: 'bucket-2-id',
            },
            {
                name: 'Bucket Three',
                id: 'bucket-3-id',
            },
            {
                name: 'Bucket Four',
                id: 'bucket-4-id',
            }
        ]
    })
})

router.get('/dashboard/:newService', async(req, res) => {
    res.render('dashboard/createnew', {
        user: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
        page: 'dashboard',
        data: 'serivces'
    })
})

module.exports = router;
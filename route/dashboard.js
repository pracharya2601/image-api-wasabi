const express = require("express");
const { mainDashboardGet, serviceEditPost, serviceGet, serviceEditGet } = require("../controller/dashboard/mainDashboard");
const { setting } = require("../controller/services");
const router = express.Router();

router.get('/', mainDashboardGet);

router.get('/services/:serviceType/:serviceId', serviceGet)
router.put('/services/:serviceType/:serviceId', serviceEditPost)
router.get('/services/:serviceType/:serviceId/setting', setting)
router.get('/services/:serviceType/:serviceId/edit', serviceEditGet)


router.get('/:newService', async(req, res) => {
    res.render('dashboard/createnew', {
        page: 'dashboard',
        data: 'serivces'
    })
})


module.exports = router;
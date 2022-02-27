const express = require("express");
const router = express.Router();
const iam = require('../iam/index');

function encode(data) {
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}

router.get("/console", async (req, res) => {
    const object_get_params = {
        Bucket: "testing-101",
        Key: "download-2.jpg" //need the name of the file
    };
    try {
        
        // create a bucket with the above parameters.
        let imagedata;
        const data = await iam.getObject(object_get_params).promise();
        console.log(data);
        if(data) {
            imagedata = "data:image/jpeg;base64," + encode(data.Body)
        }
        res.render('console/apis', {
            email: 'pracharya2601@gmail.com',
            imagedata: imagedata,
            user: 'Prakash Acharya',

        })
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});



router.post("/console", async (req, res) => {
    const type = req.body.type;
    const ep = new AWS.Endpoint('iam.wasabisys.com');
    // Create an IAM client
    const iam = new AWS.IAM({endpoint:ep});
    // here is an example of creating a user using IAM
    try {
        res.render('console/apis', {
            email: 'pracharya2601@gmail.com'

        })
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
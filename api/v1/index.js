const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const busboy = require('busboy');
const S3 = require('../../iam/index');

router.delete("/v1/delete", (req, res) => {
  const delete_params = {
    Bucket: 'testing-101',
    Key: req.query.key,
  }
  S3.deleteObject(delete_params, (err, s3res) => {
    if (err){
      res.send({err, status: 'error'});
    } else {
      res.send({status: 'success', msg: 'Image deleted successfully.'});
    }
  })
})

router.post("/v1/upload", async (req, res) => {
  
  let chunks = [], fname, ftype, fEncoding;
  const bb = busboy({ headers: req.headers });
  bb.on('file', function(name, file, info) {
    const { filename, encoding, mimeType } = info;
    const imageExtention = filename.split('.')[filename.split('.').length - 1];
    console.log('filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimeType);
    fname = `${uuidv4()}.${imageExtention}`;
    ftype = mimeType;
    fEncoding = encoding;
    file.on('data', function(data) {
        // you will get chunks here will pull all chunk to an array and later concat it.
        console.log (chunks.length);
        chunks.push(data)
    });
    file.on('end', function() {
        console.log('File [' + filename + '] Finished');
    });
  });
  bb.on('finish', function() {
    const params = {
        Bucket: 'testing-101/apple', // your s3 bucket name
        Key: fname, 
        Body: Buffer.concat(chunks), // concatinating all chunks
        ACL: 'public-read',
        ContentEncoding: fEncoding, // optional
        ContentType: ftype // required
    }
  // we are sending buffer data to s3.
  S3.upload(params, (err, s3res) => {
      if (err){
        res.send({err, status: 'error'});
      } else {
        res.send({data:s3res, status: 'success', msg: 'Image successfully uploaded.'});
      }
  });
  });
  req.pipe(bb);
});

module.exports = router;
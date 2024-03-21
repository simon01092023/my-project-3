const express = require('express');
const router = express.Router();
const pollsCtrl = require('../../controllers/polls');
const multer = require('multer');
const upload = multer();

// /*---------- Public Routes ----------*/
// /api/polls 
// 'photos' in upload.array, comes from the key 
// on the  formData.append('photos', photos) which 
const cpUpload = upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }])
// is the formData being sent from the react app(client) to express
router.post('/', cpUpload, pollsCtrl.create);

// /api/polls the index functions job is to return all of the polls
router.get('/', pollsCtrl.index)



/*---------- Protected Routes ----------*/




module.exports = router;
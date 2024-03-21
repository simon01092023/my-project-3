const express = require('express');
const router = express.Router();
const votesCtrl = require('../../controllers/votes')

// in server app.use('/api', votesRouter)
// so the full routes are 
// /api/posts/:id/votes
router.post('/polls/:id/votes', votesCtrl.create)
// /api/likes/:id
router.delete('/votes/:id', votesCtrl.deleteLike)

module.exports = router;
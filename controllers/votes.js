const Poll = require('../models/poll');

module.exports = {
    create
}

async function create(req, res){
 console.log(req.body)
    try {
        const poll = await Poll.findById(req.params.id);
        poll.votes.push({username: req.user.username, userId: req.user._id, choice: req.body.choice}); //mutating a document
        await poll.save()// save it
        res.status(201).json({data: 'vote added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}


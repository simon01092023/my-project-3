const Poll = require('../models/poll');

module.exports = {
    create,
    deleteVote
}

async function create(req, res){
 
    try {
        const poll = await Poll.findById(req.params.id);
        poll.votes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await poll.save()// save it
        res.status(201).json({data: 'vote added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteVote(req, res){
    try {
        
        const poll = await Poll.findOne({'votes._id': req.params.id, 'votes.username': req.user.username});
        poll.votes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await poll.save() // after you mutate a document you must save
        res.json({data: 'vote removed'})
    } catch(err){
        res.status(400).json({err})
    }
}
const mongoose = require("mongoose");

const votesSchema = mongoose.Schema({
  username: String,
  // One User has many votes, referencing because we have user model, so we can get the users information when we need it
  //
  userId: { type: mongoose.Schema.Types.ObjectId },
});


// One a user has many polls 
// A poll belongs to a User
const pollSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photoUrl1: String,
  photoUrl2: String,
  caption: String,
  // One Poll has many likes, we are using embedding, because the likes will always be tied to the poll, so no reason
  // to make a likes model
  votes: [votesSchema],
});

module.exports = mongoose.model("Poll", pollSchema);
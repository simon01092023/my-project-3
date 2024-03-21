const PollModel = require("../models/poll");



module.exports = {
  create,
  index
};

const { v4: uuidv4 } = require('uuid');
// uuid, helps generate our unique ids
const S3 = require('aws-sdk/clients/s3');
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

const BUCKET_NAME = process.env.S3_BUCKET


function create(req, res) {
  console.log(req.files, req.body, req.user)
  const photo1 = req.files.photo1[0]
  const photo2 = req.files.photo2[0]
  console.log(req.files, req.body, req.user)
  // check to make sure a file was sent over
  const filePath = `pupstagram/${uuidv4()}-${photo1.originalname}`
  const params1 = { Bucket: BUCKET_NAME, Key: filePath, Body: photo1.buffer }
  const filePath2 = `pupstagram/${uuidv4()}-${photo2.originalname}`
  const params2 = { Bucket: BUCKET_NAME, Key: filePath2, Body: photo2.buffer }
  // Upload our file to aws (request/response to aws)
  s3.upload(params1, async function (err, data) {
    if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
    s3.upload(params2, async function (err, dataFromAWS) {
      console.log("=======================");
      console.log(err, " err from aws");
      console.log("=======================");
      if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
      try {
        // then save our poll to mongodb (request and response to mongodb)
        // Using our model to create a document in the polls collection in mongodb
        const createPoll = await PollModel.create({
          caption: req.body.caption,
          user: req.user,
          photoUrl1: data.Location,
          photoUrl2: dataFromAWS.Location

        });

        // Populate the user information
        // no need call exec because you are populating
        // on a document
        await poll.populate('user')

        // respond to the client!
        // 201 means resource created!
        // then respond to the client (completing a request, by making response to the client(browser))
        res.status(201).json({ poll });

      } catch (err) {
        //console.log(err);
        res.status(400).json({ err });
      }
    })
  })
}

async function index(req, res) {
  try {
    // this populates the user when you find the polls
    // so you'll have access to the users information
    // when you fetch the polls
    const polls = await PollModel.find({}).populate("user").exec();
    res.status(200).json({ polls });
  } catch (err) {
    res.json({ error: err })
  }
}
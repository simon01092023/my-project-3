import { useState, useEffect } from 'react'
import PollFeed from "../../components/PollFeed/PollFeed";
import Header from "../../components/Header/Header";
import AddPollForm from "../../components/AddPollForm/AddPollForm";
import { Grid } from "semantic-ui-react";
import tokenService from '../../utils/tokenService';

export default function FeedPage({ loggedUser, handleLogout }) {

  const [polls, setPolls] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)

  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddPoll(pollToSendToServer) {
    console.log(pollToSendToServer, " formData from addPoll form")

    try {
      // Since we are sending a photo
      // we are sending a multipart/formdData request to express
      // so express needs to have multer setup on this endpoint!
      const response = await fetch('/api/polls', {
        method: 'POST',
        body: pollToSendToServer, // < No jsonify because we are sending a photo
        headers: {
          // convention for sending jwts, tokenService is imported above
          Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
          //and and it to our api request
          // so the server knows who the request is coming from when the client is trying to make a POST
        }
      })

      const data = await response.json();
      //       res.status(201).json({ createPoll }); this value is from express/polls/create controller
      console.log(data, ' response from post request! This from express')
      setPolls([data.polls, ...polls])
    } catch (err) {
      console.log(err.message)
      console.log('CHECK YOUR SERVER TERMINAL!!!!')
    }

  }

  // C(R)UD
  async function getPolls() {
    try {

      // This is going to express to get the polls
      // so this is the start of loading

      const response = await fetch("/api/polls", {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
      // CHECK THE DATA then update state!
      setLoading(false)
      console.log(data);
      setPolls(data.polls);
    } catch (err) {
      console.log(err);
    }
  }

  async function addVote(id) { // pollId comes from the card component
    // where we call this function
    try {
      const response = await fetch(`/api/polls/${id}/votes`, {
        method: 'POST',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        }
      })

      const data = await response.json();
      console.log(data, ' response from addVote')
      getPolls(); // Refetch the polls, which updates the state, 
      // the poll will now have the user in inside of the 
      // poll.votes array
    } catch (err) {
      console.log(err)
    }
  }

  async function removePoll(id) {
    try {
      const response = await fetch(`/api/polls/${id}`, {
        method: 'DELETE',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        }
      })

      const data = await response.json()
      console.log(data, ' response from delete poll')
      getPolls(); // call getPolls to sync you data and update state
      // so the poll is removed from the array 
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    // This useEffect is called when the page loads

    // Don't forget to call the function
    getPolls();
  }, []);
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPollForm handleAddPoll={handleAddPoll} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          {loading ? <h1>Loading.....</h1> : <PollFeed polls={polls} itemsPerRow={1} isProfile={false} addVote={addVote} removePoll={removePoll} loggedUser={loggedUser} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

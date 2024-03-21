import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";



export default function PollCard({ poll, isProfile, addVote, removeVote, loggedUser }) {

  // if the logged in User's is in the poll.votes array 
  // loggedUser has voted on the poll
  // - heart color - red
  // - clickHandler - removeVote

  // loggedUser has not voted on the poll
  // - heart color - blue
  // - clickHandler - addVote

  // function handleAddVote(){
  //   addVote(poll._id)
  // }

  // function handleRemoveVote(){
  //   removeVote(poll.votes[voteIndex]._id) 
  // }


  // 1. Search the array for the user
  // this will return -1, if there is no match, otherwise it will return the index num of the like
  const votedIndex = poll.votes.findIndex(vote => vote.username === loggedUser.username);
  const voteColor = votedIndex > -1 ? 'red' : 'blue';
  const clickHandler = votedIndex > -1 ? () => removeVote(poll.votes[likedIndex]._id) : () => addVote(poll._id)


  // This is the same as the arrow functions above, we don't want to call the functions until the button is clicked
  // the arrow functions are just anoymous functions (without a name)
  // const clickHandler = votedIndex > -1 ? handleRemoveVote : handleAddVote


  // Another Option using find 
  // const vote = poll.votes.find(vote => vote.username === loggedUser.username);
  // const voteColor = vote ? 'red' : 'blue';
  // const clickHandler = vote ? () => removeVote(vote._id) : () => addVote(poll._id)


  return (

    <Card>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Link to={`/${poll.user.username}`}>
            <Image
              floated="left"
              size="large"
              avatar
              src={
                poll.user.photoUrl
                  ? poll.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            <Card.Header floated="right">{poll.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}

      <Image src={`${poll.photoUrl1}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{poll.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={voteColor} onClick={clickHandler} />
        {poll.votes.length} Votes
      </Card.Content>
    </Card>
  );
}
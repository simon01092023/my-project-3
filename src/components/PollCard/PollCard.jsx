import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


export default function PollCard({ poll, isProfile, addVote, removePoll, loggedUser }) {

  // if the logged in User's is in the poll.votes array 
  // loggedUser has voted on the poll
  // - heart color - red
  // - clickHandler - removeVote

  // loggedUser has not voted on the poll
  // - heart color - blue
  // - clickHandler - addVote

  const votedIndex = poll.votes.findIndex(vote => vote.username === loggedUser.username);
 
  const pollIndex = poll => poll.username === loggedUser.username;
  
  // const p = poll.find(poll => poll.username === loggedUser.username);
  // const vote = poll.votes.find(vote => vote.username === loggedUser.username);
  const voteColor = votedIndex > -1 ? 'red' : 'blue';
  const clickHandler = votedIndex > -1 ? () => addVote(poll._id) : false


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
        <Image src={`${poll.photoUrl2}`} wrapped ui={false} />
        <Card.Content>
          <Card.Description>{poll.caption}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
          <Icon name={"heart"} size="large" color={voteColor} onClick={clickHandler} />
          {poll.votes.length} Votes
          <Icon name={"heart"} size="large" color={voteColor} onClick={clickHandler} />
          {poll.votes.length} Votes
          {loggedUser._id === poll.user._id ? <button onClick={() => removePoll(poll._id)}>DELETE</button> : null}
          </Card.Content>
      </Card >
    )
}
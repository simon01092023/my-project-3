import { Button, Card, Icon, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./PollCard.css";


export default function PollCard({ poll, isProfile, addVote, removePoll, loggedUser }) {
  const hasVotedForFirst = poll.votes.some(vote => vote.username === loggedUser.username && vote.choice === poll.choice1);
  const hasVotedForSecond = poll.votes.some(vote => vote.username === loggedUser.username && vote.choice === poll.choice2);

  const handleVote = (pollId, choice) => {
      addVote(pollId, choice);
    }

console.log(poll.votes.length)
  return (
    <Card>
      {!isProfile && (
        <Card.Content textAlign="left">
          <Link to={`/${poll.user.username}`}>
            <Image
              floated="left"
              size="large"
              avatar
              src={poll.user.photoUrl || "https://react.semantic-ui.com/images/wireframe/square-image.png"}
            />
            <Card.Header>{poll.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}
      
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={poll.photoUrl1} wrapped ui={false} />
            <Card.Content extra textAlign="center">
              <Icon name="heart" size="large" color={hasVotedForFirst ? 'red' : 'black'} onClick={() => handleVote(poll._id, poll.choice1)} />
              {poll.votes.filter(vote => vote.choice === poll.choice1).length} Votes
            </Card.Content>
          </Grid.Column>

          <Grid.Column>
            <Image src={poll.photoUrl2} wrapped ui={false} />
            <Card.Content extra textAlign="center">
              <Icon name="heart" size="large" color={hasVotedForSecond ? 'red' : 'black'} onClick={() => handleVote(poll._id, poll.choice2)} />
              {poll.votes.filter(vote => vote.choice === poll.choice2).length} Votes
            </Card.Content>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {loggedUser._id === poll.user._id && (
        <Card.Content extra textAlign="right">
          <Button color="red" onClick={() => removePoll(poll._id)}>
            DELETE
          </Button>
        </Card.Content>
      )}
    </Card>
  );
}

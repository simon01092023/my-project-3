import { Button, Card, Icon, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./PollCard.css";

export default function PollCard({ poll, isProfile, addVote, removePoll, loggedUser }) {
  const hasVoted = poll.votes.some(vote => vote.username === loggedUser.username);
  const hasVotedForFirst = hasVoted && poll.votes.some(vote => vote.choice === poll.choice1);
  const hasVotedForSecond = hasVoted && poll.votes.some(vote => vote.choice === poll.choice2);

  const handleVote = (pollId, choice) => {
    if (!hasVoted) {
      addVote(pollId, choice);
    }
  };


  console.log(poll.votes.length)
  return (
    <Card className="poll-card">
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

      <Grid divided='vertically' className="poll-grid">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={poll.photoUrl1} wrapped ui={false} className="poll-image" />
            <Card.Content extra textAlign="center" className="vote-section">
              <Icon name="heart" size="large" className={`vote-icon ${hasVotedForFirst ? 'red' : 'black'}`} onClick={() => handleVote(poll._id, poll.choice1)} disabled={hasVoted} />
              {poll.votes.filter(vote => vote.choice === poll.choice1).length} Votes
            </Card.Content>
          </Grid.Column>

          <Grid.Column>
            <Image src={poll.photoUrl2} wrapped ui={false} className="poll-image" />
            <Card.Content extra textAlign="center" className="vote-section">
              <Icon name="heart" size="large" className={`vote-icon ${hasVotedForFirst ? 'red' : 'black'}`} onClick={() => handleVote(poll._id, poll.choice2)} disabled={hasVoted} />
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

import PollCard from "../PollCard/PollCard";
import { Card } from 'semantic-ui-react';

export default function PollFeed({ polls, itemsPerRow, isProfile, addVote, removePoll, loggedUser }) {
console.log(polls, '++++++++++++++++++++++++++++++')
        const pollCards = polls.map((poll) => {
            return <PollCard poll={poll} key={poll._id} isProfile={isProfile} addVote={addVote} removePoll={removePoll} loggedUser={loggedUser} />
        })

        return (
            <Card.Group itemsPerRow={itemsPerRow}>
                {pollCards}
            </Card.Group>
        )

}


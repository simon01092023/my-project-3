import { Card } from 'semantic-ui-react';
import PollCard from '../PollCard/PollCard';


export default function ProfilePollDisplay({ isProfile, polls, itemsPerRow }) {

    const pollCards = polls.map((poll) => {
        return (<PollCard key={poll._id} poll={poll} isProfile={isProfile} />)
    })

    return (
        <Card.Group itemsPerRow={3}>
            {pollCards}
        </Card.Group>

    )
}
import PollCard from "../PollCard/PollCard"
import { Card } from 'semantic-ui-react'

export default function PollFeed({ polls, itemsPerRow, isProfile, addVote, removeVote, loggedUser }) {
    // console.log(polls[0].caption, ' < This is polls[0].caption')

    const pollCards = polls.map((poll) => {
        return <PollCard poll={poll} key={poll._id} isProfile={isProfile} addVote={addVote} removeVote={removeVote} loggedUser={loggedUser} />
    })

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
            {pollCards}
        </Card.Group>
    )

}
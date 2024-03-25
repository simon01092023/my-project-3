import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";




export default function PageHeader({ loggedUser, handleLogout }) {
    const iconStyle = {
        color: '#000000', // Ensures icons are black
        filter: 'grayscale(100%)', // Converts icons to grayscale
    };
    return (
        <Segment clearing>
            <Header as="h2" floated="right">
                <Link to="/">
                    <Icon name="home" style={iconStyle}></Icon>
                </Link>
                <Link to="" onClick={handleLogout} style={iconStyle}>
                    Logout
                </Link>
            </Header>
            <Header as="h2" floated="left">
                <Link to={`/${loggedUser.username}`}>
                    <Image
                        src={
                            loggedUser.photoUrl
                                ? loggedUser.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        avatar
                    ></Image>
                </Link>
            </Header>
        </Segment>
    )
}
import * as React from 'react';
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import User from "../../../domain/viewModel/User";
import Moment from "react-moment";
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {Link} from "react-router-dom";
import routes from '../../routes';


const ThoughtsHeaderContainer = styled.div`
margin-top: 1em;
position: relative;
`;

const HeaderLogo = styled.div`
position: absolute;
  left: 1em;
`;

const HeaderTitle = styled.div`
  text-align: center;
  font-size: 1.5em;
`;

const HeaderAvatar = styled.div`
  position: absolute;
    right: 1em;
    top: 0;
`;

const AvatarContainer = styled(Avatar)`
`;

interface IProps {
    currentDateTime: Date,
    user: User,
    handleLogout: () => void
}

interface IState {
    anchorDropdownElement: EventTarget | null
}

class ThoughtsHeader extends React.Component<IProps, IState> {
    public state = {
        anchorDropdownElement: null
    };

    public render() {
        const {currentDateTime, user} = this.props;
        const {anchorDropdownElement} = this.state;

        return (
            <ThoughtsHeaderContainer>
                <Link to={routes.home}>
                    <HeaderLogo>Thoughts Journal</HeaderLogo>
                </Link>
                <HeaderTitle>
                    <Moment date={currentDateTime} format='dddd DD/MM/YY' />
                </HeaderTitle>
                <HeaderAvatar>
                    <AvatarContainer
                        alt={user.firstName}
                        src={user.photoUrl}
                        aria-owns={anchorDropdownElement ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={(event: any) => this.handleClick(event)}
                    />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorDropdownElement}
                        open={!!anchorDropdownElement}
                        onClose={this.handleClose}
                    >
                        <Link to={routes.home}>
                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                        </Link>
                    </Menu>
                </HeaderAvatar>
            </ThoughtsHeaderContainer>
        );
    }

    private handleClick = (event: Event) => {
        this.setState({anchorDropdownElement: event.currentTarget});
    };

    private handleClose = () => {
        this.setState({anchorDropdownElement: null});
    };

    private logout = () => {
        this.handleClose();
        this.props.handleLogout();
    }

}

export default ThoughtsHeader;

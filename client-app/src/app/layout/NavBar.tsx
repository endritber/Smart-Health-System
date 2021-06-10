import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Icon, Image, Menu} from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer (function NavBar() {

    const {userStore:{user, logout}} = useStore();


    return (
        
        <Menu inverted secondary fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to= '/' header>
                    <Image className='navbarphoto' src='/logohealth.png' alt = 'logo' style={{"border-radius":"20px"}} />
                </Menu.Item>
                <Menu.Item as={NavLink} to = '/myhealthlist' name ="My Health" />
                <Menu.Item as={NavLink} to = '/summarylist' name ="Summary"/>
                <Menu.Item as={NavLink} to = '/getcare' name ="Get Care"/>
                <Menu.Item as={NavLink} to = '/messages' name ="Messages"/>
                <Menu.Item as={NavLink} to = '/diseaseprediction' name ="Disease Prediction"/>

                <Menu.Item position="right">
                    <Icon name='user'/>
                    {/* <Image src= {user?.image || '/dika'} avatar spaced='right' /> */}
                    <Dropdown pointing="top left" text={user?.displayName}>
                        <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Log out' icon='power'/>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                </Menu.Item>
            </Container>

        </Menu>
    )
})
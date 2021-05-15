import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu} from 'semantic-ui-react';

export default function NavBar() {
    return (
        
        <Menu inverted secondary fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to= '/' header>
                    <img src="" alt='logo' style={{marginRight:'12px'}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to = '/myhealthlist' name ="My Health" />
                <Menu.Item as={NavLink} to = '/summarylist' name ="Summary"/>
                <Menu.Item as={NavLink} to = '/getcare' name ="Get Care"/>
                <Menu.Item as={NavLink} to = '/messages' name ="Messages"/>
                <Menu.Item as={NavLink} to = '/diseaseprediction' name ="Disease Prediction"/>
            </Container>

        </Menu>
    )
}
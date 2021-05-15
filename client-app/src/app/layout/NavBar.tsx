import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu} from 'semantic-ui-react';

export default function NavBar() {
    return (
        
        <Menu inverted secondary pointing fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="" alt='logo' style={{marginRight:'12px'}}/>
                </Menu.Item>
                <Menu.Item name ="My Health" />
                <Menu.Item name ="Summary"/>
                <Menu.Item name ="Get Care"/>
                <Menu.Item name ="Messages"/>
                <Menu.Item name ="Disease Prediction"/>
            </Container>

        </Menu>
    )
}
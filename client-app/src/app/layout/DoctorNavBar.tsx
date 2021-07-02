import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default  observer (function DoctorNavBar() {
    const {userStore:{user, logout, isLoggedIn} } = useStore();

    return (
        
        <Menu inverted secondary fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to= '/' header>
                <Image className = 'navbarphoto'src='/logohealth.png' style={{"border-radius":"20px"}} alt = 'logo' />
                </Menu.Item>

                <Menu.Item as={NavLink} to={`/myPatients/${user?.id}`} name ="MyPatients" />
                <Menu.Item as={NavLink} to = '/messages' name ="Messages"/>
            
            {isLoggedIn &&
                <>
            <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                    </>}
                    </Container>
        </Menu>
    )
})
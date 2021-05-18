import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container textAlign="center" style={{marginBottom:600}}>
                <Header as='h1' inverted>
                    <Icon name="heartbeat" size ="massive"></Icon>
                    Smart Health System (temporary homepage)
                </Header>
                {userStore.user?.roleId === 1 ? ( 
                    <>

                {userStore.isLoggedIn ? (

                    <>
                    <Header as='h2' inverted content={`Welcome to Smart Health System ${userStore.user?.displayName}`}/> 
                    <Button primary as={Link} to='/myhealthlist' size='massive' >
                        Get Started Patient
                    </Button>

                    </>   
                ) : (
                    <Button primary onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='medium' error inverted>
                    Log In!
                     </Button>
                )} </>
                ) : (

                    <>
                {userStore.isLoggedIn ? (

                         <>
                        <Header as='h2' inverted content={`Welcome to Smart Health System ${userStore.user?.displayName}`}/> 
                       <Button primary as={Link} to='/mypatientlist' size='massive' >
                                Get Started Doctor
                        </Button>

                        </>   
                   ) : (
                    <Button primary onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='medium' error inverted>
                         Log In!
                      </Button>
                                    )}
                    </>
                )}
            </Container>

        </Segment>
    )
})


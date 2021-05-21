import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';


export default observer(function HomePage() {
    const {userStore, modalStore, labResultStore} = useStore();

    if (labResultStore.loadingInitial === false) {labResultStore.loadingInitial=true
    return <LoadingComponent content="Loading Smart Health..."/>}

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text style={{marginBottom:50}}>
                <Header as='h1' inverted>
                    <Image  className="photo"  src='/logohealth.png' alt = 'logo'/>
                    <Header color= 'grey'
                            as='h6'
                            content='Smart Health System'/>
                </Header>
                {userStore.user?.roleId === 1 ? ( 
                    <>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content={`Everything You Need! - ${userStore.user?.displayName}`}/> 
                    <Button primary as={Link} to='/myhealthlist' size='massive' >
                        Get Started
                    </Button>

                    </>   
                ) : (
                    <Button primary onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='large' error inverted>
                    Log In!
                     </Button>
                )} </>
                ) : (

                    <>
                {userStore.isLoggedIn ? (
                         <>
                        <Header as='h2' inverted content={`Everything you need about your Patients! - ${userStore.user?.displayName}`}/> 
                       <Button primary as={Link} to='/patients' size='massive' >
                                Get Started
                        </Button>

                        </>   
                   ) : (
                    <Button primary onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='large' error inverted>
                         Log In!
                      </Button>
                             )}
                    </>
                )}
            </Container>

        </Segment>
    )
})


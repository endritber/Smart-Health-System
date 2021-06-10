import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Image, Grid, List, Divider, Menu } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';


export default observer(function HomePage() {
    const {userStore, modalStore, labResultStore} = useStore();

    return (
        <>
<Segment>

        <div className="App">
        <Grid stackable container>
          <Grid.Row>
          <Image style={{height:"60px", wight:"60px", "border-radius":"80px", marginTop:10}} src='/logoHealth.png' />
            <Header size="large" as="h3" style={{marginLeft:20}}>
              Smart Health
              {userStore.isLoggedIn?(<Header></Header>):
              (
               <>
              <Button content='Sign Up' color='teal' floated='right' style={{marginLeft:730}}></Button>
              </>)}
              
            </Header>
          </Grid.Row>
          <Divider />
          <Divider hidden section />
          <Grid.Row>
            <Container textAlign="center">
              <Header as="h1" size="huge">
              Making good health accessible to all.
              </Header>
              <p>
              Book same day appointments.
              </p>
              {userStore.user?.roleId===1 ? (
                <>
                {userStore.isLoggedIn ? (
                  <>
                <Button color='teal' as={Link} to={'/myhealthlist'} size='massive' >
                Get started {userStore.user.userName}
              </Button>
              </>):( <Button floated='right' color='teal' onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='large' error >
                    Log In
                     </Button>
               )}
                </>
              ):(
              <>
                {userStore.isLoggedIn ? (
                         <>
                       <Button color='teal' as={Link} to={`/myPatients/${userStore.user?.id}`} size='massive' >
                                Get Started {userStore.user?.displayName}
                        </Button>

                        </>   
                   ) : (
                    <Button color='teal' onClick={()=>{modalStore.openModal(<LoginForm/>)}} size='large' error >
                         Log In
                      </Button>
                             )}
                    </>
              )
              }
    
            </Container>
          </Grid.Row>
          <Divider hidden section />
          <Divider hidden section />
          <Grid.Row columns="three" style={{marginTop:40}}>
            <Grid.Column style={{marginLeft:100}}>
            <Icon size='massive' name='laptop'></Icon>
              <Header size='large' as="h1">
                
              </Header>
              <p>
              <Header style={{"font-size":"35px"}}>Book same day appointments</Header>
              Primary and virtual care visits on YOUR schedule.
              </p>
            </Grid.Column>
            <Grid.Column style={{marginLeft:200}}>
            <Icon size = 'massive' name='mobile'></Icon>
              <Header size="huge" as="h1">
                
              </Header>
              <p>
              <Header style={{"font-size":"35px"}}>Chat with your health team</Header>
              Get treated for a range of symptoms & conditions right from your smartphone.
              </p>
            </Grid.Column>
            <Grid.Column style={{marginLeft:98,marginTop:98}}>
            <Icon size='massive' name='doctor'></Icon>
              <Header size='huge' as="h1">
              </Header>
              <p>
             <Header style={{"font-size":"35px"}}>All your health in one place</Header> 
            Access your medical charts, complete records, and test results immediately.
              </p>

            </Grid.Column>
            <Grid.Column style={{marginLeft:200,marginTop:98}}>
            <Icon size='massive' name='home'></Icon>
              <Header size='large' as="h1">
                
              </Header>
              <p>
              <Header style={{"font-size":"35px"}}>Prescriptions at your doorstep</Header>
              Get your medications sent straight to your chosen pharmacy or to your door—whatever works for you.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Divider hidden section />
          <Grid.Row>
            <Grid.Column>
              <Divider />
              <footer>&copy; 2021 Smart Health Company, Inc.</footer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </Segment>

   </>
    )
})


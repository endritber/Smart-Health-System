import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {Button, Divider, Grid, Header, Icon, Item, Message } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';




export default observer(function MyHealthList() {

    const {userStore} = useStore();

    return (

<>
      <Message floating>
      <Grid textAlign="center">
      <Icon name='calendar check' size='massive'/>
        <Header size="huge" as="h1"style={{marginTop:30}}>
          Appointments
        </Header>
        <Header>
        <p className="lead"style={{marginTop:100, marginRight:100}}>
        Check the latest appointments you made
        </p></Header>
      <Button animated='vertical' style={{marginTop:30, marginRight:310}}>
      <Button.Content visible>View Appointments</Button.Content>
      <Button.Content hidden><Icon name='arrow down' /></Button.Content>
      </Button>
      </Grid>
    </Message>

    <Message>
      <Grid textAlign="center" style={{marginRight:100}}>
     <Icon name='file alternate outline' size='massive'/>
        <Header size="huge" as="h1" style={{marginTop:30}}>
          Lab Results
        </Header>
        <Header>
        <p className="lead" style={{marginTop:100, marginRight:70}}>
        The result of tests done in laboratory
        </p></Header>
        <Button animated='vertical' style={{marginTop:30, marginRight:210}} as={Link} to={`/myhealthlist/labresults/${userStore.user?.id}`}>
      <Button.Content visible>View Lab Results</Button.Content>
      <Button.Content hidden><Icon name='arrow down' /></Button.Content>
    </Button>
      </Grid>
    </Message>

    <Message>
      <Grid textAlign="center" style={{marginRight:60}}>
      <Icon name='pen square' size='massive'/>
        <Header size="huge" as="h1" style={{marginTop:30}} >
          Prescriptions
        </Header>
        <Header>
        <p className="lead" style={{marginTop:100, marginRight:100}}>
        Medicines ordered by the Doctor
        </p></Header>
        <Button animated='vertical' style={{marginTop:30, marginRight:230}} as={Link} to={`/myhealthlist/prescriptions/${userStore.user?.id}`}>
      <Button.Content visible>View Prescriptions</Button.Content>
      <Button.Content hidden><Icon name='arrow down' /></Button.Content>
    </Button>
      </Grid>
    </Message>

    <Message>
      <Grid textAlign="center" style={{marginRight:40}}>
      <Icon name='heartbeat' size='massive'/>
        <Header size="huge" style={{marginTop:30}} >
          Allergies
        </Header>
        <Header>
        <p className="lead" style={{marginTop:100, marginRight:100}}>
        An immune response by the body to a substance
        </p></Header>
        <Button animated='vertical' style={{marginTop:30, marginRight:270}} as={Link} to={`/myhealthlist/allergies/${userStore.user?.id}`}>
      <Button.Content visible>View Allergies</Button.Content>
      <Button.Content hidden><Icon name='arrow down' /></Button.Content>
    </Button>
      </Grid>
    </Message>

    <Message>
      <Grid textAlign="center" style={{marginLeft:-100}}>
      <Icon name='chart bar' size='massive' />
        <Header size="huge" as="h1" style={{marginTop:20}}>
          Medical Images
        </Header>
        <Header>
        <p className="lead"  style={{marginTop:100}}>
        Images for diagnostics and treatment
        </p></Header>
        <Button animated='vertical' style={{marginTop:30, marginRight:220}}>
      <Button.Content visible>View Med Images</Button.Content>
      <Button.Content hidden><Icon name='arrow down' /></Button.Content>
    </Button>
      </Grid>
    </Message>
    


      </>
    )
})
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {Button, Segment, Grid, Image, Icon, Item, Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';




export default observer(function MyHealthList() {

    const {userStore} = useStore();

    return (

<>
<Segment>
        <Item.Group relaxed divided>  
        <Item as='a'>
        <Image className='weight' src='/appointments.png' alt = 'logo' />
          <Item.Content verticalAlign='bottom'>
            <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}><Header sub style={{marginTop:"30px"}}>Appointments</Header><Icon name='arrow alternate circle right outline' style={{'margin-left':'810px'}}></Icon></Item.Header>
          </Item.Content>
        </Item>


        <Item as={Link} to={`/myhealthlist/labresults/${userStore.user?.id}`}>
        <Image className='weight' src='/labresults.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'> 
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}><Header sub style={{marginTop:"30px"}}>Laboratory results</Header><Icon name='arrow alternate circle right outline' style={{'margin-left':'810px'}}></Icon></Item.Header>
         
          </Item.Content>
        </Item>
        

        <Item as={Link} to= {`/myhealthlist/prescriptions/${userStore.user?.id}`}>
        <Image className='weight' src='/prescriptions.png' alt = 'logo' />
          <Item.Content verticalAlign='bottom'>
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}><Header sub style={{marginTop:"30px"}}>Prescriptions</Header><Icon name='arrow alternate circle right outline' style={{'margin-left':'810px'}}></Icon></Item.Header>
          </Item.Content>
        </Item>
        
        <Item as={Link} to={`/myhealthlist/allergies/${userStore.user?.id}`}>


  
        <Image className='weight' src='/allergies.png' alt = 'logo' />
          <Item.Content verticalAlign='bottom'>
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}><Header sub style={{marginTop:"30px"}}>Allergies</Header><Icon name='arrow alternate circle right outline' style={{'margin-left':'810px'}}></Icon></Item.Header>
          
          </Item.Content>
        </Item>

        <Item as='a'>


        <Image className='weight' src='/images.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}><Header sub style={{marginTop:"30px"}}>Medical Images</Header><Icon name='arrow alternate circle right outline' style={{'margin-left':'810px'}}></Icon></Item.Header>
          
          </Item.Content>
        </Item>

        
      </Item.Group>
      </Segment>
    


      </>
    )
})
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Image, Item, Segment, SegmentProps } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default function SummaryList() {
  const {userStore} = useStore()
    return (
        <Segment>
        <Item.Group relaxed divided>

  
        <Item as={Link} to= {`/weight/${userStore.user?.id}`}>
        <Image className='weight' src='/weight.png' alt = 'logo' />
          <Item.Content verticalAlign='bottom'>
            <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}>Weight<Icon name='arrow alternate circle right outline' style={{'margin-left':'800px'}}></Icon></Item.Header>
          </Item.Content>
        </Item>


        <Item as={Link} to={`/height/${userStore.user?.id}`}>

        <Image className='height' src='/height.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'> 
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}>Height<Icon name='arrow alternate circle right outline' style={{'margin-left':'807px'}}></Icon></Item.Header>
         
          </Item.Content>
        </Item>
        

        <Item as={Link} to= {`/water/${userStore.user?.id}`}>


        <Image className='water' src='/water.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}>Water<Icon name='arrow alternate circle right outline' style={{'margin-left':'811px'}}></Icon></Item.Header>
         
            
          </Item.Content>
        </Item>
        
        <Item as='a'>


        <Image className='vitals' src='/vitals.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
          <Item.Header style={{'margin-bottom':'40px','font-size':'30px',}}>Vitals<Icon name='arrow alternate circle right outline' style={{'margin-left':'815px'}}></Icon></Item.Header>
          
          </Item.Content>
        </Item>

        
      </Item.Group>
      </Segment>
    )
}
    

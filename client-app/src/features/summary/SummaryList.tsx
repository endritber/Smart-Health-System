import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Image, Item } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';


export default function SummaryList() {
    return (
        <Item.Group relaxed divided>
  
        <Item>
        <Image className='weight' src='/weight.png' alt = 'logo' />
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Weight</Item.Header>
            <Item.Description>Add your weight</Item.Description>
            <Item.Extra>
              <Button  style={{marginRight:"450px"}}  floated='right'>Edit</Button>
            </Item.Extra>
            <Item.Extra>
              <Button  style={{marginRight:"450px"}}  floated='right'>Save</Button>
            </Item.Extra>
          </Item.Content>
        </Item>


        <Item>

        <Image className='height' src='/height.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
            <Item.Header>Height</Item.Header>
            <Item.Description>Add your height</Item.Description>
            <Item.Extra>
              <Button as={Link}  style={{marginRight:"450px"}} floated='right'>Edit</Button>
            </Item.Extra>
            <Item.Extra>
              <Button as={Link}  style={{marginRight:"450px"}} floated='right'>Save</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        

        <Item>


        <Image className='water' src='/water.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
            <Item.Header>Water Intake</Item.Header>
            <Item.Description>Add your water intake</Item.Description>
            <Item.Extra>
              <Button as={Link} style={{marginRight:"450px"}} floated='right'>Edit</Button>
            </Item.Extra>              
            <Item.Extra>
              <Button as={Link} style={{marginRight:"450px"}} floated='right'>Save</Button>
            </Item.Extra>

          </Item.Content>
        </Item>
        
        <Item>


        <Image className='vitals' src='/vitals.png' alt = 'logo' />

          <Item.Content verticalAlign='bottom'>
          <Item.Header>Vitals</Item.Header>
          <Item.Description>Add your vitals</Item.Description>
            <Item.Extra>
              <Button as={Link} style={{marginRight:"450px"}} floated='right'>Edit</Button>
            </Item.Extra>              
            <Item.Extra>
              <Button as={Link} style={{marginRight:"450px"}} floated='right'>Save</Button>
            </Item.Extra>

          </Item.Content>
        </Item>

        
      </Item.Group>
    )
}
    

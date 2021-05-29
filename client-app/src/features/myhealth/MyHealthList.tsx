import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Divider, Icon, Item } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';



export default observer(function MyHealthList() {
    return (
        <Item.Group relaxed>
        <Item>
          <Divider/>
        <Icon name='calendar check' size='massive'/>
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Appointments</Item.Header>
            <Item.Description>Check the latest appointments you made</Item.Description>
            <Item.Extra>
              <Button  style={{marginRight:"450px"}}  floated='right'>View</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
        <Divider/>
        <Icon name='file alternate outline' size='massive'/>
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Lab Results</Item.Header>
            <Item.Description>The result of tests done in laboratory</Item.Description>
            <Item.Extra>
              <Button as={Link} to = '/myhealthlist/labresults' style={{marginRight:"450px"}} floated='right'>View</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
        <Divider/>
        <Icon name='pen square' size='massive'/>
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Prescriptions</Item.Header>
            <Item.Description>Medicines ordered by the Doctor</Item.Description>
            <Item.Extra>
              <Button as={Link} to = '/myhealthlist/prescriptions' style={{marginRight:"450px"}} floated='right'>View</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
        <Divider/>
        <Icon name='heartbeat' size='massive'/>
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Vitals</Item.Header>
            <Item.Description>Status of the body's vital functions</Item.Description>
            <Item.Extra>
              <Button style={{marginRight:"450px"}} floated='right'>View</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
        <Divider/>
        <Icon name='chart bar' size='massive'/>
          <Item.Content verticalAlign='bottom'>
            <Item.Header>Medical Images</Item.Header>
            <Item.Description>Images for diagnostics and treatment</Item.Description>
            <Item.Extra>
              <Button style={{marginRight:"450px"}} floated='right'>View</Button>
            </Item.Extra>
          </Item.Content>
        </Item>        
        
      </Item.Group>
    )
})
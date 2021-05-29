import { observer } from "mobx-react-lite";
import { Button, Card, Divider, Grid, Header, Icon, Item, Label, Reveal, Segment, Statistic } from "semantic-ui-react";
import { doctorprofile } from "../../app/models/doctorprofile";
import { patientprofile } from "../../app/models/patientprofile";

interface Props {
   profile : doctorprofile;
}

export default  observer (function ProfileHeaderDoctor ({profile}: Props){
    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    <Item.Group>
                        <Item>
                            <Icon name='user' size='massive'></Icon>
                            
                            <Card>
                                <Card.Header>
                                    {profile.name === null ? <>{profile.userName} {profile.lastName}</>
                                        :
                                     <>{profile.name} {profile.lastName}</>

                                    } 
                                </Card.Header>
                                ...
                            </Card>

                            <Item.Content verticalAlign='middle'>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                <Item.Group divided>
                    <Item>

                    <Item.Content style={{marginTop:20}}>
                        <Item.Header as='a'>Experience: {profile.yearsExperience} Years</Item.Header>
                        <Divider/>
                        <Item.Header as='a'>Education: {profile.education}</Item.Header>
                        <Item.Meta>
                        <span className='cinema'>Gender: {profile.gender}</span>
                        </Item.Meta>
                        <Item.Extra>
                        <Label icon='chevron right' content='Description...' />
                        </Item.Extra>
                    </Item.Content>
                    </Item>
                    </Item.Group>

                </Grid.Column>

                <Reveal animated="move" >
                    <Reveal.Content visible style={{width:' 100%'}}></Reveal.Content>
                    {/* <Button fluid color ='blue' content='Test' floated='right'/> */}
                </Reveal>

                
            </Grid>
        </Segment>
    )
})
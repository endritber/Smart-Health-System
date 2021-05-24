import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { patientprofile } from "../../app/models/patientprofile";

interface Props {
    profile: patientprofile;
}

export default  observer (function ProfileHeaderPatient ({profile}: Props){
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small'/>
                            <Item.Content verticalAlign='middle'>
                                {profile.name}, {profile.lastName}, {profile.profession}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label="Test"/>
                    </Statistic.Group>
                </Grid.Column>
                <Divider/>

                <Reveal animated="move" >
                    <Reveal.Content visible style={{width:' 100%'}}></Reveal.Content>
                    <Button fluid color ='blue' content='Test' floated='right'/>
                </Reveal>

                
            </Grid>
        </Segment>
    )
})
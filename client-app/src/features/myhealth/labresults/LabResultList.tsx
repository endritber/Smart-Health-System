import { observer } from "mobx-react-lite";
import { Button, Card, Checkbox, Divider, Icon, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function LabResultList() {

    const {labResultStore} = useStore();
    const {LabResultsByName} = labResultStore;

    return (
        <Item.Group divided>
        {LabResultsByName.map(labresult => (
        <Item key={labresult.id}>
            <Item.Content>
                <Item.Header as='a'>Sample: {labresult.sample}</Item.Header>
                <Divider/>
                <Card.Group doubling>
                    <Card>
                    <Card.Content>
                        <Card.Header>Date: {labresult.date}</Card.Header>
                        <Card.Meta>Status: {labresult.status}</Card.Meta>
                    </Card.Content>
                    </Card>
                </Card.Group>
                <Segment compact>
                    <Checkbox/>
                    </Segment>
                <Item.Extra>
                <Button onClick={() => labResultStore.selectLabResult(labresult.id)} primary floated='right' color='red'>
                    View Result
                    <Icon name='angle right' />
                </Button>
                </Item.Extra>
               
            </Item.Content>
            </Item>

        ))}
  </Item.Group>


    )
})
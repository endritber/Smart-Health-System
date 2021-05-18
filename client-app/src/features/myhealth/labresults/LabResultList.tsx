import { Button, Card, Checkbox, Divider, Icon, Item, Segment } from "semantic-ui-react";
import { LabResult } from "../../../app/models/labresult";

interface Props {
    labresults: LabResult[];
    selectLabResult: (id: string)=> void;
}

export default function LabResultList({labresults, selectLabResult}: Props) {
    return (
        <Item.Group divided>
        {labresults.map(labresult => (
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
                <Button onClick={() => selectLabResult(labresult.id)} primary floated='right' color='red'>
                    View Result
                    <Icon name='angle right' />
                </Button>
                </Item.Extra>
               
            </Item.Content>
            </Item>

        ))}
  </Item.Group>








        // <Segment>
        //     <Item.Group divided>
        //         {labresults.map(labresult => (
        //             <Item key={labresult.id}>
        //                 <Item.Content>
        //                     <Item.Header as='a' >
        //                         {labresult.problem}
        //                         </Item.Header>
        //                         <Item.Description >
        //                             {labresult.problemProportion}
        //                         </Item.Description>
        //                         <Item></Item>
        //                         <Item></Item>
        //                         <Item.Description>
        //                             {labresult.result}
        //                         </Item.Description>
        //                         <Item></Item>
        //                         <Item></Item>
        //                         <Item.Description>
        //                             {labresult.resultProportion}
        //                         </Item.Description>
        //                         <Item></Item>
        //                         <Item></Item>
        //                         <Item.Extra>
        //                             <Button floated='right' content='View Result' color='teal'/>
        //                         </Item.Extra>
                            
        //                 </Item.Content>
        //             </Item>
        //         ))}
        //     </Item.Group>
        // </Segment>
    )
}
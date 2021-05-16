import { Button, Card, Divider, Grid, Icon, Image, SegmentGroup } from "semantic-ui-react";
import { LabResult } from "../../../../app/models/labresult";

interface Props {
    labresult: LabResult;
    cancelSelectLabResult: () => void;
}

export default function LabResultDetail({labresult, cancelSelectLabResult}:Props) {

    return (

    <Card centered style={{marginLeft:"130px"}}>
    <Icon name="file text outline" size='huge'></Icon>
    <Card.Content>
      <Card.Header>Sample: {labresult.sample}</Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> Problem Proportion: {labresult.problemProportion}</span>
      </Card.Meta>
      <Divider/>
      <Card.Header>Result: {labresult.result}</Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> Result Proportion: {labresult.resultProportion}</span>
      </Card.Meta>
      <Divider/>
      <Card.Header>Date: {labresult.date}</Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> Status: {labresult.status}</span>
      </Card.Meta>
      <Divider/>
      <Card.Description>
        Result Description (soon to be added!)
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button onClick={cancelSelectLabResult} basic content = 'Cancel'color='red'>
    </Button>
    </Card.Content>
  </Card>
    )
}
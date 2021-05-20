import { Button, Card, Divider, Icon } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function LabResultView() {

  const{labResultStore} = useStore();
  const {selectedLabResult: labresult, cancelSelectedLabResult} = labResultStore;

  if (!labresult) return <LoadingComponent content="loading"/>;

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
    <Button onClick={cancelSelectedLabResult} basic content = 'Cancel'color='red'>
    </Button>
    </Card.Content>
  </Card>
    )
}
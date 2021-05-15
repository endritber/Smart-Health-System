import { Button, Card, Icon, Image } from "semantic-ui-react";
import { LabResult } from "../../../../app/models/labresult";

interface Props {
    labresult: LabResult;
    cancelSelectLabResult: () => void;
}

export default function LabResultDetail({labresult, cancelSelectLabResult}:Props) {

    return (
    <Card style={{marginLeft:"130px"}}>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Problem: {labresult.problem}</Card.Header>
      <Card.Meta></Card.Meta>
      <Card.Meta>
        <span className=''> Problem Proportion: {labresult.problemProportion}</span>
      </Card.Meta>
      <Card.Meta></Card.Meta>
      <Card.Header>Result: {labresult.result}</Card.Header>
      <Card.Meta></Card.Meta>
      <Card.Meta></Card.Meta>
      <Card.Meta>
        <span className=''> Result Proportion: {labresult.resultProportion}</span>
      </Card.Meta>
      <Card.Description>
        Result Desription (soon to be added!)
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button onClick={cancelSelectLabResult} basic content = 'Cancel'color='red'>
    </Button>
    </Card.Content>
  </Card>
    )
}
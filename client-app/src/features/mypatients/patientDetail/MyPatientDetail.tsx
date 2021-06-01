import { observer } from "mobx-react-lite";
import { Button, Card, Divider, Icon } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import patientStore from "../../../app/stores/patientStore";
import { useStore } from "../../../app/stores/store";




export default function MyPatientDetail() {

  const{patientStore} = useStore();
  const {selectedPatient: patient} = patientStore;
  console.log(patient)


//   if (!labresult) return <LoadingComponent content="loading"/>;
    return (
    <Card centered style={{marginLeft:"130px"}}>
    <Icon name="file text outline" size='huge'></Icon>
    <Card.Content>
      <Card.Header>Name: {patient?.name}
      </Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> LastName:</span>
      </Card.Meta>
      <Divider/>
      <Card.Header>Result: </Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> Result Proportion:</span>
      </Card.Meta>
      <Divider/>
      <Card.Header>Date:</Card.Header>
      <Divider/>
      <Card.Meta>
        <span className=''> Status:</span>
      </Card.Meta>
      <Divider/>
      <Card.Description>
        Result Description (soon to be added!)
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button basic content = 'Cancel'color='red'>
    </Button>
    </Card.Content>
  </Card>
    )
}
import { observer } from "mobx-react-lite";
import { Button, Card, Divider, Icon, Image, Segment } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Doctor } from "../../../app/models/doctor";
import patientStore from "../../../app/stores/patientStore";
import { useStore } from "../../../app/stores/store";




export default observer( function MyPatientDetail() {

  const{patientStore} = useStore();
  const {selectedPatient: patient, cancelSelectedPatient} = patientStore;
  const {id} = useParams<{id: string}>();

    return (
      <Segment>
      <Card className='card'>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/steve.jpg'
        />
        <Card.Header>{patient?.name} {patient?.lastName}</Card.Header>
        <Card.Meta>Profession: {patient?.profession}</Card.Meta>
        <Card.Description>
          Patient Language : {patient?.language}
        </Card.Description>
      </Card.Content>

    <Card.Content extra>
      <Card.Header>Laboratory Results</Card.Header>
    <Button color='teal' as={Link} to ={`/myPatients/labResults/${patient?.id}/${id}`} fluid>Show Lab Results</Button>
    </Card.Content>

    
    <Card.Content extra>
    <Card.Header>Prescriptions</Card.Header>
    <Button color='teal' as={Link} to ={`/myPatients/prescriptions/${patient?.id}/${id}`} fluid>Show Prescriptions</Button>
    </Card.Content>

    <Card.Content extra>
    <Card.Header>Allergies</Card.Header>
    <Button color='teal' as={Link} to ={`/myPatients/allergies/${patient?.id}/${id}`} fluid>Show Allergies</Button>

    </Card.Content>
    <Card.Content extra>
    <Button onClick={cancelSelectedPatient} basic content = 'Cancel'color='red'>
    </Button>
    </Card.Content>
  </Card>
  </Segment>
    )
    
})
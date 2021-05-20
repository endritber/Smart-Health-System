import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Card, Divider, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import LabResultDetail from "../../myhealth/labresults/details/LabResultDetail";




export default observer( function PatientDetails () {
  const {patientStore, modalStore} = useStore();
  const {selectedPatient: patient, cancelSelectedPatient} = patientStore

if(!patient) return <LoadingComponent content="Loading"/>
    return (
     <Card>
         <Image src = "/"/>
    <Card.Content>
      <Card.Header>{patient.name} {patient.lastName}</Card.Header>
      <Card.Meta>
        <span> Date of Birth: {patient.birthDate}</span>
      </Card.Meta>
      <Card.Description>
        Disease: {patient.disease}
      </Card.Description>
      <Card.Description>
        Allergies: {patient.allergies}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
            <Button.Group>
            <Button  color='teal'>View</Button>
            <Button.Or />
            <Button color="grey">Add Prescriptions</Button>
            </Button.Group>
            <Divider/>
            <Button.Group>
            <Button color='teal'>View</Button>
            <Button.Or/>
            <Button as={Link} to =  'addLabResults'color='grey'>Add Lab Results</Button>
            </Button.Group>
            <Divider/>
            <Button.Group>
            <Button color='teal'>View</Button>
            <Button.Or />
            <Button color='grey'>Add Medical Images</Button>
            </Button.Group>
            <Divider/>
            <Button onClick={cancelSelectedPatient}  color='red'content='Cancel'/>

    </Card.Content>
  </Card>
    )
})
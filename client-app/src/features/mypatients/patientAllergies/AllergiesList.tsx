import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Divider, Modal, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";



export default observer (function AllergiesList() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, allergyStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deleteAllergy, loading} = allergyStore
    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Allergies...`}/>

      

      function handleLabResultDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
            setTarget(e.currentTarget.name)
            deleteAllergy(id).then(()=> history.push(`/myPatients/${doctorId}`));
      }

    return (
        <Segment>    
        <Button size ='huge' color='teal' as={Link} to={`/allergyForm/${patientId}/${doctorId}`}>
                Add Allergy for {selectedPatient?.name} {selectedPatient?.lastName}
        </Button>
        {selectedPatient?.allergies.map(allergy=> (
            <Card  fluid>
            <Card.Content>
                <Card.Header>Information: <Card.Content>{allergy.info}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Causes: <Card.Content>{allergy.causes}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Treatments: <Card.Content>{allergy.treatments}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Natural Remedies: <Card.Content>{allergy.naturalRemedies}<Card.Content/><Card.Header/>
                <Divider/>
                <Card.Header>Common Food Triggers: <Card.Content>{allergy.commonFoodTriggers}</Card.Content></Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Divider/>
            <Segment>
            <Button.Group>
                <Button as={Link} to={`/manageAllergy/${patientId}/${doctorId}/${allergy.id}`} color='blue'>
                    Edit Allergy
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete Allergy
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={allergy.id}
            loading={loading && target===allergy.id}
            onClick={(e)=>handleLabResultDelete(e, allergy.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
            
                </Button.Group>
                </Segment>
            </Card.Content>
            </Card.Header>
            </Card.Content>
            </Card>
        ))}
        <Divider/>
        </Segment>
    )
})
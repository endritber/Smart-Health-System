import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, Divider, Header, Icon, Image, Item, Modal, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";



export default observer (function PrescriptionsList() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, prescriptionStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deletePrescription, loading} = prescriptionStore
    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Prescriptions...`}/>

      

      function handlePrescriptionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
            setTarget(e.currentTarget.name)
            deletePrescription(id).then(()=> history.push(`/myPatients/${doctorId}`));
      }

    return (
        <Segment>    
        <Button size ='huge' color='teal' as={Link} to={`/prescriptionsForm/${patientId}/${doctorId}`}>
                Add Prescription for {selectedPatient?.name} {selectedPatient?.lastName}
        </Button>
        {selectedPatient?.prescriptions.map(prescription=> (
            <Card fluid>
            <Card.Content>
                <Card.Header style={{display:'inline'}}>Medication: <Card.Content>{prescription.medication}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Prescription Dose: <Card.Content>{prescription.dose}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Prescription Provider: <Card.Content>{prescription.provider}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>
                Date Added: 
                <Card.Meta>
                {prescription.prescribed}
                </Card.Meta>
                <Divider/>
                </Card.Header>

                <Card.Header>Dose: <Card.Content>{prescription.dose}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Frequency: <Card.Content>{prescription.frequency}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Quantity: <Card.Content>{prescription.quantity}</Card.Content></Card.Header>
            </Card.Content>
            <Card.Content extra>
            <Button.Group>
                <Button as={Link} to={`/managePrescription/${patientId}/${doctorId}/${prescription.id}`} color='blue'>
                    Edit Prescription
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete Prescription
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={prescription.id}
            loading={loading && target===prescription.id}
            onClick={(e)=>handlePrescriptionDelete(e, prescription.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
            
                </Button.Group>
                
            </Card.Content>
            
            </Card>
           
            
        ))}
        <Divider/>
        </Segment>

    )
})
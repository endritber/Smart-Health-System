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
      var count = 0;
    return (
      <>
      <Header sub>{selectedPatient?.name} {selectedPatient?.lastName}'s Prescriptions</Header> 
      <br/>  
              <Button size ='huge' color='teal' as={Link} to={`/prescriptionsForm/${patientId}/${doctorId}`}>
                Add Prescription
        </Button> 
        <Segment>    
 
        {selectedPatient?.prescriptions.map(prescription=> (
          <>
          
            <Card style={{display:"inline-block", width:"325.5px",marginRight:"40px", "border-radius": "15px"}}>
            <Card.Content fluid>
              <Card.Description><Header sub >Prescription {count+=1}</Header></Card.Description>
              <br></br>
               <Card.Description>Medication: {prescription.medication}</Card.Description>
               <Divider />
                <Card.Description>Prescription Dose: {prescription.dose}</Card.Description>
                <Divider  />
                <Card.Description>Prescription Provider: {prescription.provider}</Card.Description>
                <Divider  />
                <Card.Description>Date Added: {prescription.prescribed}</Card.Description>
                <Divider  />
                <Card.Description>Dose: {prescription.dose}</Card.Description>
                <Divider  />
                <Card.Description>Frequency: {prescription.frequency}</Card.Description>
                <Divider  />
                <Card.Description>Quantity: {prescription.quantity}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group fluid>
                <Button as={Link} to={`/managePrescription/${patientId}/${doctorId}/${prescription.id}`} color='blue'>
                    Edit
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete
        </Button> }
        > <Modal.Description>Are you sure ?</Modal.Description>
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
            
          </>
         
        ))}
        </Segment>
</>
    )
})
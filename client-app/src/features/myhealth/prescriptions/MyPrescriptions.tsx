import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, Divider, Header, Icon, Image, Item, Modal, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";



export default observer (function MyPrescriptions() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, prescriptionStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deletePrescription, loading} = prescriptionStore
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        loadPatient(id)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Prescriptions...`}/>

      var count = 0;
    return (
      <>
      <Header sub>Your Prescriptions</Header> 
      <br/>  

 
        {selectedPatient?.prescriptions.map(prescription=> (
          <>
          
            <Card style={{display:"inline-block", width:"325.5px",marginRight:"40px", "border-radius": "15px"}}>
            <Card.Content>
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
           
            </Card>
          </>
        ))}
</>
    )
})
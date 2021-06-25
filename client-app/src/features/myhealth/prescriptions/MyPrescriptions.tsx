import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, Divider, Header, Message } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer (function MyPrescriptions() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, prescriptionStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        loadPatient(id)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Prescriptions...`}/>

      var count = 0;
    return (
      <>

{(selectedPatient?.prescriptions.length === 0) ? (

<Message negative>
<Message.Header>{selectedPatient?.name}, your doctor hasn't added any prescriptions yet.</Message.Header>
<p>Make sure to contact your doctor!</p>
</Message>
) :(
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
  </>)}
        </>
    )
})
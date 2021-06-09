import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Prescription } from "../../../app/models/prescription";
import { useStore } from "../../../app/stores/store";


export default observer (function PrescriptionForm(){

    const history = useHistory();

    const { prescriptionStore} = useStore();

    const {loading, createPrescription, updatePrescription, loadPrescription} = prescriptionStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {prescriptionId} = useParams<{prescriptionId: string}>();

    const [prescription, setPrescription]= useState<Prescription>({
        id: '',
        medication: '',
        dose: '',
        frequency: '',
        quantity: '',
        provider: '',
        prescribed: '',
    });
    
    useEffect(()=>{
        if (prescriptionId) loadPrescription(prescriptionId).then(prescription=>setPrescription(prescription!))
},[prescriptionId, loadPrescription]);
    
    function handleSubmit() {
        prescription.id? updatePrescription(prescription).then(()=> history.push(`/myPatients/prescriptions/${patientId}/${doctorId}`))
        
        : createPrescription(prescription,patientId,doctorId).then(()=> history.push(`/myPatients/prescriptions/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setPrescription({...prescription, [name]:value})
    }

    return (
        <Segment> {prescription.id?
            <Header content='Edit Prescription'></Header> :
            <Header content='Add Prescription'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='Medication' placeholder='Medication...' name = 'medication' value = {prescription.medication} onChange={handleInputChange}  />
            <Form.Input label='Provider' placeholder='Provider...' name = 'provider' value = {prescription.provider} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input label='Prescribed' placeholder='Prescribed...' name = 'prescribed' value = {prescription.prescribed} onChange={handleInputChange}/>
            <Form.Group widths={3}>
            <Form.Input label='Dose' placeholder='Dose...' name = 'dose' value = {prescription.dose} onChange={handleInputChange}/>
            <Form.Input label=' Frequency' placeholder='Frequency...'name = 'frequency' value = {prescription.frequency} onChange={handleInputChange} />
            <Form.Input label=' Quantity' placeholder='Quantity...'name = 'quantity' value = {prescription.quantity} onChange={handleInputChange} />
            </Form.Group>
    
            <Button as={Link} to ={`/myPatients/prescriptions/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
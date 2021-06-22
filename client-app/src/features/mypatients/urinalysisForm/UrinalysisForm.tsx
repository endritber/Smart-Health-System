import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { Urinalysis } from "../../../app/models/urinalysis";
import { useStore } from "../../../app/stores/store";


export default observer (function UrinalysisForm(){

    const history = useHistory();

    const { urinalysisStore} = useStore();

    const {loading, createurinalysis, updateurinalysis, loadurinalysis} = urinalysisStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {UrinalysisId} = useParams<{UrinalysisId: string}>();

    const [urinalysis, setUrinalysis]= useState<Urinalysis>({
        id: '',
        sodium:parseInt(''),
        potassium:parseInt(''),
        chloride:parseInt(''),
        hcO3:parseInt(''),
        creatinine:parseInt(''),
        bloodUreaNitrogen:parseInt(''),
        fastingGlucose:parseInt(''),
        calcium:parseInt(''),
        magnesium:parseInt(''),
        phosphate:parseInt(''),
        date:'',
  
    });
    
    useEffect(()=>{
        if (UrinalysisId) loadurinalysis(UrinalysisId).then(urinalysis=>setUrinalysis(urinalysis!))
},[UrinalysisId, loadurinalysis]);
    
    function handleSubmit() {
        urinalysis.id? updateurinalysis(urinalysis).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`))
        
        : createurinalysis(urinalysis,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setUrinalysis({...urinalysis, [name]:value})
    }

    return (
        <Segment> { urinalysis.id?
            <Header content='Edit Urinalysis from Laboratory'></Header> :
            <Header content='Add Urinalysis from Laboratory'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={3}>
            <Form.Input label='Sodium' placeholder='sodium...' name = 'sodium' value = {urinalysis.sodium} onChange={handleInputChange}  />
            <Form.Input label='Potassium' placeholder='potassium...' name = 'potassium' value = {urinalysis.potassium} onChange={handleInputChange}/>
            <Form.Input label='Chloride' placeholder='chloride...' name = 'chloride' value = {urinalysis.chloride} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Hco3' placeholder='hco3...' name = 'hcO3' value = {urinalysis.hcO3} onChange={handleInputChange}  />
            <Form.Input label='Creatinine' placeholder='creatinine...' name = 'creatinine' value = {urinalysis.creatinine} onChange={handleInputChange}/>
            <Form.Input label='BloodUreaNitrogen' placeholder='bloodUreaNitrogen...' name = 'bloodUreaNitrogen' value = {urinalysis.bloodUreaNitrogen} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='FastingGlucose' placeholder='fastingGlucose...' name = 'fastingGlucose' value = {urinalysis.fastingGlucose} onChange={handleInputChange}  />
            <Form.Input label='Calcium' placeholder='calcium...' name = 'calcium' value = {urinalysis.calcium} onChange={handleInputChange}/>
            <Form.Input label='Magnesium' placeholder='magnesium...' name = 'magnesium' value = {urinalysis.magnesium} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='Phosphate' placeholder='phosphate...' name = 'phosphate' value = {urinalysis.phosphate} onChange={handleInputChange}  />
            <Form.Input label='Date' placeholder='Date added...' name = 'date' value = {urinalysis.date} onChange={handleInputChange}/>
            </Form.Group>
            
            
        
            <Button as={Link} to ={`/myPatients/labResults/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
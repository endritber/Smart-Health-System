import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { Urinalysis } from "../../../app/models/urinalysis";
import { useStore } from "../../../app/stores/store";

interface Props {
    patientId:string;
    doctorId:string;
    UrinalysisId:string;
}
export default observer (function UrinalysisForm({patientId, doctorId, UrinalysisId}:Props){

    const history = useHistory();

    const { urinalysisStore} = useStore();

    const {loading, createurinalysis, updateurinalysis, loadurinalysis} = urinalysisStore;



    const [urinalysis, setUrinalysis]= useState<Urinalysis>({
        id: '',
        sodium:0,
        potassium:0,
        chloride:0,
        hcO3:0,
        creatinine:0,
        bloodUreaNitrogen:0,
        fastingGlucose:0,
        calcium:0,
        magnesium:0,
        phosphate:0,
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
            <Form.Input label='Sodium' placeholder='sodium...' type='number' step="0.1"name = 'sodium' value = {urinalysis.sodium} onChange={handleInputChange}  />
            <Form.Input label='Potassium' placeholder='potassium...'type='number' step="0.1" name = 'potassium' value = {urinalysis.potassium} onChange={handleInputChange}/>
            <Form.Input label='Chloride' placeholder='chloride...'type='number' step="0.1" name = 'chloride' value = {urinalysis.chloride} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Hco3' placeholder='hco3...' type='number' step="0.1"name = 'hcO3' value = {urinalysis.hcO3} onChange={handleInputChange}  />
            <Form.Input label='Creatinine' placeholder='creatinine...'type='number' step="0.1" name = 'creatinine' value = {urinalysis.creatinine} onChange={handleInputChange}/>
            <Form.Input label='BloodUreaNitrogen' placeholder='bloodUreaNitrogen...'type='number' step="0.1" name = 'bloodUreaNitrogen' value = {urinalysis.bloodUreaNitrogen} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={4}>
            <Form.Input label='FastingGlucose' placeholder='fastingGlucose...' type='number' step="0.1"name = 'fastingGlucose' value = {urinalysis.fastingGlucose} onChange={handleInputChange}  />
            <Form.Input label='Calcium' placeholder='calcium...' type='number' step="0.1"name = 'calcium' value = {urinalysis.calcium} onChange={handleInputChange}/>
            <Form.Input label='Phosphate' placeholder='phosphate...' type='number' step="0.1"name = 'phosphate' value = {urinalysis.phosphate} onChange={handleInputChange}  />
            <Form.Input label='Magnesium' placeholder='magnesium...' type='number' step="0.1"name = 'magnesium' value = {urinalysis.magnesium} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input type='Date' label='Date' placeholder='Date added...' name = 'date' value = {urinalysis.date} onChange={handleInputChange}/>
            
            
    
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
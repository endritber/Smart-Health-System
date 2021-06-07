import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { LabResult } from "../../../app/models/labresult";
import { Patient } from "../../../app/models/patient";
import { patientprofile } from "../../../app/models/patientprofile";
import doctorStore from "../../../app/stores/doctorStore";
import labResultStore from "../../../app/stores/labResultStore";
import { useStore } from "../../../app/stores/store";


export default observer (function LabResultForm(){

    const history = useHistory();

    const {doctorStore, labResultStore} = useStore();

    const {loading, createLabResult} = labResultStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    const [labResult, setLabResult]= useState<LabResult>({
     id:'',
     sample:'',
     problemProportion:'',
     date:'',
     result:'',
     resultProportion:'',
     status:''
    });

//     useEffect(()=>{
//         if (patientId) loadLabResult(patientId).then(labResult=>setLabResult(labResult!))
// },[patientId, loadLabResult]);
    
    function handleSubmit() {
        createLabResult(labResult,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setLabResult({...labResult, [name]:value})
    }

    return (
        <Segment>
            <Header content='Add Results from Laboratory'></Header>
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='Sample' placeholder='Sample...' name = 'sample' value = {labResult.sample} onChange={handleInputChange}  />
            <Form.Input label='Problem Proportion' placeholder='Proportion...' name = 'problemProportion' value = {labResult.problemProportion} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input label='Date' placeholder='Date added...' name = 'date' value = {labResult.date} onChange={handleInputChange}/>
            <Form.Group widths={2}>
            <Form.Input label='Result' placeholder='Result...' name = 'result' value = {labResult.result} onChange={handleInputChange}/>
            <Form.Input label='Result Proportion' placeholder='Proportion...'name = 'resultProportion' value = {labResult.resultProportion} onChange={handleInputChange} />
            </Form.Group>
    
            <Button as={Link} to ={`/myPatients/labResults/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
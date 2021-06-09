import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { LabResult } from "../../../app/models/labresult";
import { useStore } from "../../../app/stores/store";


export default observer (function LabResultForm(){

    const history = useHistory();

    const { labResultStore} = useStore();

    const {loading, createLabResult, updateLabResult, loadLabResult} = labResultStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {id} = useParams<{id: string}>();

    const [labResult, setLabResult]= useState<LabResult>({
     id:'',
     sample:'',
     problemProportion:'',
     date:'',
     result:'',
     resultProportion:'',
     status:''
    });
    
    useEffect(()=>{
        if (id) loadLabResult(id).then(labResult=>setLabResult(labResult!))
},[id, loadLabResult]);
    
    function handleSubmit() {
        labResult.id? updateLabResult(labResult).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`))
        
        : createLabResult(labResult,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setLabResult({...labResult, [name]:value})
    }

    return (
        <Segment> { labResult.id?
            <Header content='Edit Results from Laboratory'></Header> :
            <Header content='Add Results from Laboratory'></Header> }
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
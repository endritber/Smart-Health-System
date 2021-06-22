import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { useStore } from "../../../app/stores/store";


export default observer (function CBCForm(){

    const history = useHistory();

    const { cbcStore} = useStore();

    const {loading, createcbc, updatecbc, loadcbc} = cbcStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {CBCId} = useParams<{CBCId: string}>();

    const [cbc, setCBC]= useState<CBC>({
        id:'',
        wbc:parseInt(''),
        segmentedNeutrofilis :parseInt(''),
        bandForms:parseInt(''),
        lymphocytes:parseInt(''),
        monocytes:parseInt(''),
        basoghilis:parseInt(''),
        hemoglobin:parseInt(''),
        hematocrit:parseInt(''),
        plateletCount:parseInt(''),
        date:'',
    });
    
    useEffect(()=>{
        if (CBCId) loadcbc(CBCId).then(cbc=>setCBC(cbc!))
},[CBCId, loadcbc]);
    
    function handleSubmit() {
        cbc.id? updatecbc(cbc).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`))
        
        : createcbc(cbc,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setCBC({...cbc, [name]:value})
    }

    return (
        <Segment> { cbc.id?
            <Header content='Edit CBCs from Laboratory'></Header> :
            <Header content='Add CBCs from Laboratory'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={3}>
            <Form.Input label='WBC' placeholder='wbc...' name = 'wbc' value = {cbc.wbc} onChange={handleInputChange}  />
            <Form.Input label='Segmented Neutrofilis' placeholder='SegmentedNeutrofilis...' name = 'segmentedNeutrofilis' value = {cbc.segmentedNeutrofilis} onChange={handleInputChange}/>
            <Form.Input label='Band Forms' placeholder='bandForms...' name = 'bandForms' value = {cbc.bandForms} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Lymphocytes' placeholder='lymphocytes...' name = 'lymphocytes' value = {cbc.lymphocytes} onChange={handleInputChange}  />
            <Form.Input label='Monocytes' placeholder='monocytes...' name = 'monocytes' value = {cbc.monocytes} onChange={handleInputChange}/>
            <Form.Input label='Basoghilis' placeholder='basoghilis...' name = 'basoghilis' value = {cbc.basoghilis} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Hemoglobin' placeholder='hemoglobin...' name = 'hemoglobin' value = {cbc.hemoglobin} onChange={handleInputChange}  />
            <Form.Input label='Hematocrit' placeholder='hematocrit...' name = 'hematocrit' value = {cbc.hematocrit} onChange={handleInputChange}/>
            <Form.Input label='Platelet Count' placeholder='plateletCount...' name = 'plateletCount' value = {cbc.plateletCount} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input type='Date'label='Date' placeholder='Date added...' name = 'date' value = {cbc.date} onChange={handleInputChange}/>
        
            <Button as={Link} to ={`/myPatients/labResults/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { useStore } from "../../../app/stores/store";
import React from 'react'


interface Props {
    patientId:string;
    doctorId:string;
    CBCId:string;
}

export default observer (function CBCForm({patientId, doctorId, CBCId}: Props){

    const history = useHistory();

    const { cbcStore} = useStore();

    const {loading, createcbc, updatecbc, loadcbc} = cbcStore;



    const [cbc, setCBC]= useState<CBC>({
        id:'',
        wbc:0,
        segmentedNeutrofilis :0,
        bandForms:0,
        lymphocytes:0,
        monocytes:0,
        basoghilis:0,
        hemoglobin:0,
        hematocrit:0,
        plateletCount:0,
        date:'',
    });
    
    useEffect(()=>{
        if (CBCId) loadcbc(CBCId).then(cbc=>setCBC(cbc!))
},[CBCId, loadcbc]);
    
    function handleSubmit() {
        cbc.id? updatecbc(cbc)
        
        : createcbc(cbc,patientId,doctorId)
        
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
            <Form.Input label='WBC' type='number' step="0.1" placeholder='wbc...' name = 'wbc' value = {cbc.wbc} onChange={handleInputChange}  />
            <Form.Input label='Segmented Neutrofilis' type='number' step="0.1" placeholder='SegmentedNeutrofilis...' name = 'segmentedNeutrofilis' value = {cbc.segmentedNeutrofilis} onChange={handleInputChange}/>
            <Form.Input  label='Band Forms'type='number' step="0.1" placeholder='bandForms...' name = 'bandForms' value = {cbc.bandForms} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Lymphocytes' type='number' step="0.1"placeholder='lymphocytes...' name = 'lymphocytes' value = {cbc.lymphocytes} onChange={handleInputChange}  />
            <Form.Input label='Monocytes' type='number' step="0.1"placeholder='monocytes...' name = 'monocytes' value = {cbc.monocytes} onChange={handleInputChange}/>
            <Form.Input label='Basoghilis'type='number' step="0.1" placeholder='basoghilis...' name = 'basoghilis' value = {cbc.basoghilis} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Hemoglobin'type='number' step="0.1" placeholder='hemoglobin...' name = 'hemoglobin' value = {cbc.hemoglobin} onChange={handleInputChange}  />
            <Form.Input label='Hematocrit' type='number' step="0.1"placeholder='hematocrit...' name = 'hematocrit' value = {cbc.hematocrit} onChange={handleInputChange}/>
            <Form.Input label='Platelet Count' type='number' step="0.1"placeholder='plateletCount...' name = 'plateletCount' value = {cbc.plateletCount} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input type='Date'label='Date' placeholder='Date added...' name = 'date' value = {cbc.date} onChange={handleInputChange}/>
        
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
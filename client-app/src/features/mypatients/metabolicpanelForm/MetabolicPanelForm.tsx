import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { MetabolicPanel } from "../../../app/models/metabolicpanel";
import { useStore } from "../../../app/stores/store";


export default observer (function MetabolicPanelForm(){

    const history = useHistory();

    const { metabolicpanelStore} = useStore();

    const {loading, createmetabolicpanel, updatemetabolicpanel, loadmetabolicpanel} = metabolicpanelStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {MetabolicPanelId} = useParams<{MetabolicPanelId: string}>();

    const [metabolicpanel, setMetabolicPanel]= useState<MetabolicPanel>({

        id:'',
        glucose :parseInt(''),
        bun:parseInt(''),
        protein :parseInt(''),
        albumin :parseInt(''),
        calcium:parseInt(''),
        globulin:parseInt(''),
        carbonDioxide:parseInt(''),
        date:''
    });
    
    useEffect(()=>{
        if (MetabolicPanelId) loadmetabolicpanel(MetabolicPanelId).then(metabolicpanel=>setMetabolicPanel(metabolicpanel!))
},[MetabolicPanelId, loadmetabolicpanel]);
    
    function handleSubmit() {
        metabolicpanel.id? updatemetabolicpanel(metabolicpanel).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`))
        
        : createmetabolicpanel(metabolicpanel,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setMetabolicPanel({...metabolicpanel, [name]:value})
    }

    return (
        <Segment> { metabolicpanel.id?
            <Header content='Edit Metabolic Panel from Laboratory'></Header> :
            <Header content='Add Metabolic Panel from Laboratory'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='Glucose' placeholder='glucose...' name = 'glucose' value = {metabolicpanel.glucose} onChange={handleInputChange}  />
            <Form.Input label='Bun' placeholder='bun...' name = 'bun' value = {metabolicpanel.bun} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='Protein' placeholder='protein...' name = 'protein' value = {metabolicpanel.protein} onChange={handleInputChange}  />
            <Form.Input label='albumin' placeholder='albumin...' name = 'albumin' value = {metabolicpanel.albumin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='Calcium' placeholder='calcium...' name = 'calcium' value = {metabolicpanel.calcium} onChange={handleInputChange}  />
            <Form.Input label='Globulin' placeholder='globulin...' name = 'globulin' value = {metabolicpanel.globulin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='CarbonDioxide' placeholder='carbonDioxide...' name = 'carbonDioxide' value = {metabolicpanel.carbonDioxide} onChange={handleInputChange}  />
            <Form.Input label='Date' placeholder='Date added...' name = 'date' value = {metabolicpanel.date} onChange={handleInputChange}/>
            </Form.Group>
            
            
        
            <Button as={Link} to ={`/myPatients/labResults/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
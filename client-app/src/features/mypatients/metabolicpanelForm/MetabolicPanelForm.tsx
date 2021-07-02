import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { MetabolicPanel } from "../../../app/models/metabolicpanel";
import { useStore } from "../../../app/stores/store";

interface Props {
    patientId:string;
    doctorId:string;
    MetabolicPanelId:string;
}
export default observer (function MetabolicPanelForm({patientId, doctorId, MetabolicPanelId}: Props){

    const history = useHistory();

    const { metabolicpanelStore} = useStore();

    const {loading, createmetabolicpanel, updatemetabolicpanel, loadmetabolicpanel} = metabolicpanelStore;



    const [metabolicpanel, setMetabolicPanel]= useState<MetabolicPanel>({

        id:'',
        glucose :0,
        bun:0,
        protein :0,
        albumin :0,
        calcium:0,
        globulin:0,
        carbonDioxide:0,
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
            <Form.Input label='Glucose' type='number' step="0.1"placeholder='glucose...' name = 'glucose' value = {metabolicpanel.glucose} onChange={handleInputChange}  />
            <Form.Input label='Bun'type='number' step="0.1" placeholder='bun...' name = 'bun' value = {metabolicpanel.bun} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='Protein' type='number' step="0.1"placeholder='protein...' name = 'protein' value = {metabolicpanel.protein} onChange={handleInputChange}  />
            <Form.Input label='albumin' type='number' step="0.1"placeholder='albumin...' name = 'albumin' value = {metabolicpanel.albumin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='Calcium' type='number' step="0.1"placeholder='calcium...' name = 'calcium' value = {metabolicpanel.calcium} onChange={handleInputChange}  />
            <Form.Input label='CarbonDioxide' type='number' step="0.1"placeholder='carbonDioxide...' name = 'carbonDioxide' value = {metabolicpanel.carbonDioxide} onChange={handleInputChange}  />
            <Form.Input label='Globulin' type='number' step="0.1"placeholder='globulin...' name = 'globulin' value = {metabolicpanel.globulin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input label='Date'type='Date' placeholder='Date added...' name = 'date' value = {metabolicpanel.date} onChange={handleInputChange}/>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
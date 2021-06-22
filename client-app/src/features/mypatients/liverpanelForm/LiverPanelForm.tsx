import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { LiverPanel } from "../../../app/models/liverpanel";
import { useStore } from "../../../app/stores/store";
import { scroller } from "react-scroll";


export default observer (function LiverPanelForm(){

    const history = useHistory();

    const { liverpanelStore} = useStore();

    const {loading, createLiverPanel, updateLiverPanel, loadLiverPanel} = liverpanelStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {LiverPanelId} = useParams<{LiverPanelId: string}>();

    const [liverpanel, setLiverPanel]= useState<LiverPanel>({
        id:'',
        totalBiliRubin :parseInt(''),
        directBiliRubin :parseInt(''),
        sgot:parseInt(''),
        sgpt:parseInt(''),
        alkalinePhosPhatase :parseInt(''),
        date:'',
    
    });
    
    useEffect(()=>{
        if (LiverPanelId) loadLiverPanel(LiverPanelId).then(liverpanel=>setLiverPanel(liverpanel!))
},[LiverPanelId, loadLiverPanel]);


    
    function handleSubmit() {
        liverpanel.id? updateLiverPanel(liverpanel).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`))
        
        : createLiverPanel(liverpanel,patientId,doctorId).then(()=> history.push(`/myPatients/labResults/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setLiverPanel({...liverpanel, [name]:value})
    }
    

    return (
        <Segment> { liverpanel.id?
            <Header content='Edit Liver Panel from Laboratory'></Header> :
            <Header content='Add Liver Panel from Laboratory'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='Total BiliRubin' placeholder='totalBiliRubin...' name = 'totalBiliRubin' value = {liverpanel.totalBiliRubin} onChange={handleInputChange}  />
            <Form.Input label='Direct BiliRubin' placeholder='directBiliRubin...' name = 'directBiliRubin' value = {liverpanel.directBiliRubin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='SGOT' placeholder='sgot...' name = 'sgot' value = {liverpanel.sgot} onChange={handleInputChange}  />
            <Form.Input label='SGPT' placeholder='sgpt...' name = 'sgpt' value = {liverpanel.sgpt} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={2}>
            <Form.Input label='Alkaline PhosPhatase' placeholder='alkalinePhosPhatase...' name = 'alkalinePhosPhatase' value = {liverpanel.alkalinePhosPhatase} onChange={handleInputChange}  />
            <Form.Input label='Date' placeholder='Date added...' name = 'date' value = {liverpanel.date} onChange={handleInputChange}/>
            </Form.Group>
            
        
            <Button as={Link} to ={`/myPatients/labResults/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
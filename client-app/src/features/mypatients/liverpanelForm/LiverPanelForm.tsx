import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { LiverPanel } from "../../../app/models/liverpanel";
import { useStore } from "../../../app/stores/store";
import { scroller } from "react-scroll";
interface Props {
    patientId:string;
    doctorId:string;
    LiverPanelId:string;
}

export default observer (function LiverPanelForm({patientId, doctorId,LiverPanelId }:Props){

    const history = useHistory();

    const { liverpanelStore} = useStore();

    const {loading, createLiverPanel, updateLiverPanel, loadLiverPanel} = liverpanelStore;

interface Props {
    patientId:string;
    doctorId:string;
    MetabolicPanelId:string;
}
    const [liverpanel, setLiverPanel]= useState<LiverPanel>({
        id:'',
        totalBiliRubin :0,
        directBiliRubin :0,
        sgot:0,
        sgpt:0,
        alkalinePhosPhatase :0,
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
            <Form.Input label='Total BiliRubin'type='number' step="0.1" placeholder='totalBiliRubin...' name = 'totalBiliRubin' value = {liverpanel.totalBiliRubin} onChange={handleInputChange}  />
            <Form.Input label='Direct BiliRubin' placeholder='directBiliRubin...'type='number' step="0.1" name = 'directBiliRubin' value = {liverpanel.directBiliRubin} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group unstackable widths={3}>
            <Form.Input label='SGOT' placeholder='sgot...' type='number' step="0.1"name = 'sgot' value = {liverpanel.sgot} onChange={handleInputChange}  />
            <Form.Input label='Alkaline PhosPhatase' placeholder='alkalinePhosPhatase...' type='number' step="0.1"name = 'alkalinePhosPhatase' value = {liverpanel.alkalinePhosPhatase} onChange={handleInputChange}  />
            <Form.Input label='SGPT' placeholder='sgpt...' type='number' step="0.1"name = 'sgpt' value = {liverpanel.sgpt} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Input type='Date'label='Date' placeholder='Date added...' name = 'date' value = {liverpanel.date} onChange={handleInputChange}/>
    
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
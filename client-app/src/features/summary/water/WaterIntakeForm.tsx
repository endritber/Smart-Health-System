import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { Height } from "../../../app/models/height";
import { Waterintake } from "../../../app/models/waterintake";
import { Weight } from "../../../app/models/weight";
import { useStore } from "../../../app/stores/store";

interface Props { 
    id:string
}


export default observer (function WaterIntakeForm({id} : Props){

    const history = useHistory();

    const { waterintakeStore} = useStore();

    const {loading, createWaterintake, updateWaterintake, loadWaterintake} = waterintakeStore;

    // const {patientId} = useParams<{patientId: string}>();
    // const {id} = useParams<{id: string}>();
    // console.log(id)
    const [waterintake, setWaterintake]= useState<Waterintake>({
        waterintakeId:'',
        waterPerHour: parseInt(''),
        date:'',
    });
    
    useEffect(()=>{
        if (id) loadWaterintake(id).then(height=>setWaterintake(height!))
},[id, loadWaterintake]);
    
    function handleSubmit() {
        waterintake.waterintakeId? updateWaterintake(waterintake)
        
        : createWaterintake(waterintake,id)
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setWaterintake({...waterintake, [name]:value})
    }

    return (
        <Segment> { waterintake.waterintakeId?
            <Header content='Edit Water Intake'></Header> :
            <Header content='Add Water Intake'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
           
            <Form.Input label='My Intake' placeholder='waterintake...' name = 'WaterPerHour' value = {waterintake.waterPerHour} onChange={handleInputChange}  />
            <Form.Input label='Date' type='date' placeholder='date...' name = 'date' value = {waterintake.date} onChange={handleInputChange}/>
            
           
        
            
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
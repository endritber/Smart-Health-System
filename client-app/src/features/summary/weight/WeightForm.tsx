import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { Weight } from "../../../app/models/weight";
import { useStore } from "../../../app/stores/store";

interface Props { 
    id:string
    weightId : string
}


export default observer (function WeightForm({id,weightId} : Props){

    const history = useHistory();

    const { weightStore} = useStore();

    const {loading, createWeight, updateWeight, loadWeight} = weightStore;

    // const {patientId} = useParams<{patientId: string}>();
    // const {id} = useParams<{id: string}>();
    // console.log(id)
    const [weight, setWeight]= useState<Weight>({
        weightId:'',
        myWeight: 0,
        date:'',
    });
    
    useEffect(()=>{
        if (weightId) loadWeight(weightId).then(weight=>setWeight(weight!))
},[weightId, loadWeight]);
    
    function handleSubmit() {
        weight.weightId? updateWeight(weight)
        
        : createWeight(weight,id)
        window.location.reload()
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setWeight({...weight, [name]:value})
    }

    return (
        <Segment> { weight.weightId?
            <Header content='Edit Weight'></Header> :
            <Header content='Add Weight'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
           
            <Form.Input label='My Weight' placeholder='weight...' name = 'myWeight' value = {weight.myWeight} onChange={handleInputChange}  />
            <Form.Input label='Date' type='date' placeholder='date...' name = 'date' value = {weight.date} onChange={handleInputChange}/>
            
           
        
            
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
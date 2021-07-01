import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CBC } from "../../../app/models/cbc";
import { Height } from "../../../app/models/height";
import { Weight } from "../../../app/models/weight";
import { useStore } from "../../../app/stores/store";

interface Props { 
    id:string
}


export default observer (function HeightForm({id} : Props){

    const history = useHistory();

    const { heightStore} = useStore();

    const {loading, createHeight, updateHeight, loadHeight} = heightStore;

    // const {patientId} = useParams<{patientId: string}>();
    // const {id} = useParams<{id: string}>();
    // console.log(id)
    const [height, setHeight]= useState<Height>({
        heightId:'',
        myHeight: parseInt(''),
        date:'',
    });
    
    useEffect(()=>{
        if (id) loadHeight(id).then(height=>setHeight(height!))
},[id, loadHeight]);
    
    function handleSubmit() {
        height.heightId? updateHeight(height)
        
        : createHeight(height,id)
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setHeight({...height, [name]:value})
    }

    return (
        <Segment> { height.heightId?
            <Header content='Edit Height'></Header> :
            <Header content='Add Height'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
           
            <Form.Input label='My Height' placeholder='height...' name = 'myHeight' value = {height.myHeight} onChange={handleInputChange}  />
            <Form.Input label='Date' type='date' placeholder='date...' name = 'date' value = {height.date} onChange={handleInputChange}/>
            
           
        
            
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
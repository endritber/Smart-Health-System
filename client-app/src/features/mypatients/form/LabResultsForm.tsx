import { useState } from "react";
import { Button, Form, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { createMedia } from '@artsy/fresnel'
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";






export default observer (function LabResultsForm(){

    const {labResultStore} = useStore();
    const {selectedLabResult, createLabResult, loading} = labResultStore;

    const initialState = selectedLabResult ?? {
        id: '',
        sample: '',
        problemProportion: '',
        date: '',
        result:"",
        resultProportion:'',
        status: '',
    }

    const [labresult, setlabresult] = useState(initialState);

    function handleSubmit () {
        createLabResult(labresult);
    }

    return (        
        <Segment clearing>
        <Header textAlign='center'
        as='h2'
        content='Add Additional Results from Laboratory'    
    />
            
             <Form size = 'large' onSubmit={handleSubmit} autoComplete="off">
                 <Form.Group>
                 <Form.Input width={8}  placeholder = "Sample"  name='sample'/>
                 <Form.Input width={8} placeholder = "Problem Proportion" name='problemProportion' />
                 </Form.Group>
                 <Form.Input  type = 'date'placeholder = "Date" name='date'/>
                 <Form.Group>
                 <Form.Input  width={8} placeholder = "Result"name='result' />
                 <Form.Input width={8} placeholder = "Result Proportion" name='resultProportion'/>
                 </Form.Group>
                 <Form.Input placeholder = "Status (True or False)" />
                 
                 <Button loading = {loading}  size = 'large' floated ='right' color='blue' type='submit' content='Add Lab Results'/>
                 <Button size='large' as={Link} to='/patients' loated ='right' color='red' type='button'  content='Cancel'/>
             </Form>
         </Segment>
    
    )
})
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment, Divider } from "semantic-ui-react";
import SymptomsAPIService from "../../app/api/SymptomsAPIService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Symptoms } from "../../app/models/symptoms";
import patientStore from "../../app/stores/patientStore";
import { useStore } from "../../app/stores/store";





export default observer (function DiseasePrediction(){

    const history = useHistory();

    const { patientStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore;
    const {patientId} = useParams<{patientId: string}>();

    var loading = false;

    const [prediction, setPrediction]= useState<Symptoms>({
        id: parseInt(''),
        symptom1:'',
        symptom2:'',
        symptom3:'',
        symptom4:'',
        symptom5:'',
        result:'',

    });

    const refreshPage = ()=>{
     window.location.reload();
  }
    
    useEffect(()=>{
        loadPatient(patientId)
    },[loadPatient])

    function handleSubmit() {
        loading = true
        SymptomsAPIService.addPrediction(patientId,prediction)
        window.location.reload();
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setPrediction({...prediction, [name]:value})
    }
    
    return (
        <Segment> 
            <Header content='Predict Disease'></Header> 
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='Symptom 1' placeholder='symptom1...' name = 'symptom1' value = {prediction.symptom1} onChange={handleInputChange}  />
            <Form.Input label='Symptom 2' placeholder='symptom2...' name = 'symptom2' value = {prediction.symptom2} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group widths={3}>
            <Form.Input label='Symptom 3' placeholder='symptom3...' name = 'symptom3' value = {prediction.symptom3} onChange={handleInputChange}/>
            <Form.Input label=' Symptom 4' placeholder='symptom4...'name = 'symptom4' value = {prediction.symptom4} onChange={handleInputChange} />
            <Form.Input label=' Symptom 5' placeholder='symptom5...'name = 'symptom5' value = {prediction.symptom5} onChange={handleInputChange} />
            </Form.Group>
            <Button loading = {loading}  type='submit' color='blue'>Submit</Button>
        </Form>

        <Segment>
            {selectedPatient?.symptoms.map(s=>(
                <>
                    <Header key={s.id}>
                        <Header.Content> My Predictions: {s.result}</Header.Content>
                        <Divider/>
                    </Header>
                </>
            ))}

        </Segment>


        </Segment>
    )
})
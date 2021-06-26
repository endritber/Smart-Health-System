import { observer } from "mobx-react-lite";
import { ErrorMessage, Form, Formik } from 'formik';
import { SyntheticEvent } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Segment, Divider, Message, Table, Icon } from "semantic-ui-react";
import { JsxAttribute } from "typescript";
import SymptomsAPIService from "../../app/api/SymptomsAPIService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Symptoms } from "../../app/models/symptoms";
import patientStore from "../../app/stores/patientStore";
import { useStore } from "../../app/stores/store";
import MySelectInput from '../../app/form/MySelectInput';
import * as Yup from 'yup';





export default observer (function DiseasePrediction(){

    const history = useHistory();

    var index=0;

    const { patientStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore;
    const {patientId} = useParams<{patientId: string}>();

    var loading = false;

    const [prediction]= useState<Symptoms>({
        id: parseInt(''),
        symptom1:'',
        symptom2:'',
        symptom3:'',
        symptom4:'',
        symptom5:'',
        result:'',

    });

    const validationSchema = Yup.object({
        symptom1: Yup.string().required('Symptom is required for prediction'),
        symptom2: Yup.string().required('Symptom is required for prediction'),
        symptom3: Yup.string().required('Symptom is required for prediction'),
        symptom4: Yup.string().required('Symptom is required for prediction'),
        symptom5: Yup.string().required('Symptom is required for prediction'),
    })

    const refreshPage = ()=>{
     window.location.reload();
  }
    
    useEffect(()=>{
        loadPatient(patientId)
    },[loadPatient])

    function handleFormSubmit(prediction: Symptoms) {
        loading = true
        SymptomsAPIService.addPrediction(patientId,prediction)
        window.location.reload()
    }

    if (patientStore.loadingInitial) return <LoadingComponent content={`Processing your symptoms...`}/>
    const countryOptions = [
        { text: 'itching',value: 'itching' },
        { text: 'weight_loss',value: 'weight_loss' },
  
      ]

    
    return (
        <>
        <Message>
            <Message.Header>Disease Prediction</Message.Header>
            <Message.List>
            <Message.Item>We predict, you prevent & we are healthy</Message.Item>
            <Message.Item>Get in contact with a doctor </Message.Item><Button as ={Link} to ='/messages'color='blue'>Contact</Button>
            </Message.List>
        </Message>
        <Segment> 
            <Message
                info
                header='PREDICT THE DISEASE'
                content="Get possible diagnose to match your symptoms."
            />
             <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={prediction} 
                onSubmit={handleFormSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                         <Header content='Symptom 1' sub color='teal' />
                        <MySelectInput name='symptom1' placeholder='Select your first symptom.' options={countryOptions} />
                        <Header content='Symptom 2' sub color='teal' />
                        <MySelectInput placeholder='Select your second symptom.' name='symptom2' options={countryOptions}/>
                        <Header content='Symptom 3' sub color='teal' />
                        <MySelectInput options={countryOptions} placeholder='Select your third symptom.'  name='symptom3' />
                        <Header content='Symptom 4' sub color='teal' />
                        <MySelectInput placeholder='Select your fourth symptom.'  name='symptom4'options={countryOptions} />
                        <Header content='Symptom 5' sub color='teal' />
                        <MySelectInput placeholder='Select your fifth symptom.' name='symptom5' options={countryOptions}/>
                        <Button style={{width:' 200px'}} 
                            disabled={isSubmitting || !dirty || !isValid }
                            loading={isSubmitting}
                            color='teal' type='submit' content='Predict'
                             />
                    </Form>
                )}
            </Formik>
            </Segment>
        <Segment>
            <Table celled striped>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='7'><h1>My Predictions</h1></Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='1'>No</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Symptom 1</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Symptom 2</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Symptom 3</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Symptom 4</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Symptom 5</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Prediction</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
            {selectedPatient?.symptoms.map(s=>(
                <>
             <Table.Body>
             
            {(index+1 === selectedPatient.symptoms.length)? (
                <>
                <Table.Row positive>
                <Table.Cell> 
                    {index+=1} - 
                    Recently Added
                    </Table.Cell>
                    <Table.Cell> 
                        {s.symptom1}
                    </Table.Cell>
                    <Table.Cell>{s.symptom2}</Table.Cell>
                    <Table.Cell>
                    {s.symptom3}
                    </Table.Cell>
                    <Table.Cell>
                    {s.symptom4}
                    </Table.Cell>
                    <Table.Cell>
                    {s.symptom5}
                    </Table.Cell>
                    <Table.Cell>
                       You might have {s.result}
                    </Table.Cell>
                    </Table.Row>
                </>
            ):(

             
                <>
                <Table.Row>
                <Table.Cell> 
                        {index+=1}
                    </Table.Cell>
                    <Table.Cell> 
                        {s.symptom1}
                    </Table.Cell>
                    <Table.Cell>{s.symptom2}</Table.Cell>
                    <Table.Cell>
                    {s.symptom3}
                    </Table.Cell>
                    <Table.Cell>
                    {s.symptom4}
                    </Table.Cell>
                    <Table.Cell>
                    {s.symptom5}
                    </Table.Cell>
                    <Table.Cell>
                     <h5>{s.result}</h5>
                    </Table.Cell>
                    </Table.Row>
                    </>)}
                </Table.Body>
          
                </>
            ))}
            </Table>
        </Segment>

    </>
    )
})
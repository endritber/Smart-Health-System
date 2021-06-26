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
        {text:'abdominal_pain', value:'abdominal_pain'},
        {text:'abnormal_menstruation', value:'abnormal_menstruation'},
        {text:'acidity', value:'acidity'},
        {text:'acute_liver_failure', value:'acute_liver_failure'},
        {text:'altered_sensorium', value:'altered_sensorium'},
        {text:'anxiety', value:'anxiety'},
        {text:'back_pain', value:'back_pain'},
        {text:'belly_pain', value:'belly_pain'},
        {text:'blackheads', value:'blackheads'},
        {text:'bladder_discomfort', value:'bladder_discomfort'},
        {text:'blister', value:'blister'},
        {text:'blood_in_sputum', value:'blood_in_sputum'},
        {text:'bloody_stool', value:'bloody_stool'},
        {text:'blurred_and_distorted_vision', value:'blurred_and_distorted_vision'},
        {text:'breathlessness', value:'breathlessness'},
        {text:'brittle_nails', value:'brittle_nails'},
        {text:'bruising', value:'bruising'},
        {text:'burning_micturition', value:'burning_micturition'},
        {text:'chest_pain', value:'chest_pain'},
        {text:'chills', value:'chills'},
        {text:'cold_hands_and_feets', value:'cold_hands_and_feets'},
        {text:'coma', value:'coma'},
        {text:'congestion', value:'congestion'},
        {text:'constipation', value:'constipation'},
        {text:'continuous_feel_of_urine', value:'continuous_feel_of_urine'},
        {text:'continuous_sneezing', value:'continuous_sneezing'},
        {text:'cough', value:'cough'},
        {text:'cramps', value:'cramps'},
        {text:'dark_urine', value:'dark_urine'},
        {text:'dehydration', value:'dehydration'},
        {text:'depression', value:'depression'},
        {text:'diarrhoea', value:'diarrhoea'},
        {text:'dischromic _patches', value:'dischromic _patches'},
        {text:'distention_of_abdomen', value:'distention_of_abdomen'},
        {text:'dizziness', value:'dizziness'},
        {text:'drying_and_tingling_lips', value:'drying_and_tingling_lips'},
        {text:'enlarged_thyroid', value:'enlarged_thyroid'},
        {text:'excessive_hunger', value:'excessive_hunger'},
        {text:'extra_marital_contacts', value:'extra_marital_contacts'},
        {text:'family_history', value:'family_history'},
        {text:'fast_heart_rate', value:'fast_heart_rate'},
        {text:'fatigue', value:'fatigue'},
        {text:'fluid_overload', value:'fluid_overload'},
        {text:'fluid_overload', value:'fluid_overload'},
        {text:'foul_smell_of urine', value:'foul_smell_of urine'},
        {text:'headache', value:'headache'},
        {text:'high_fever', value:'high_fever'},
        {text:'hip_joint_pain', value:'hip_joint_pain'},
        {text:'history_of_alcohol_consumption', value:'history_of_alcohol_consumption'},
        {text:'increased_appetite', value:'increased_appetite'},
        {text:'indigestion', value:'indigestion'},
        {text:'inflammatory_nails', value:'inflammatory_nails'},
        {text:'internal_itching', value:'internal_itching'},
        {text:'irregular_sugar_level', value:'irregular_sugar_level'},
        {text:'irritability', value:'irritability'},
        {text:'irritation_in_anus', value:'irritation_in_anus'},
        {text:'itching', value:'itching'},
        {text:'joint_pain', value:'joint_pain'},
        {text:'knee_pain', value:'knee_pain'},
        {text:'lack_of_concentration', value:'lack_of_concentration'},
        {text:'lethargy', value:'lethargy'},
        {text:'loss_of_appetite', value:'loss_of_appetite'},
        {text:'loss_of_balance', value:'loss_of_balance'},
        {text:'loss_of_smell', value:'loss_of_smell'},
        {text:'malaise', value:'malaise'},
        {text:'mild_fever', value:'mild_fever'},
        {text:'mood_swings', value:'mood_swings'},
        {text:'movement_stiffness', value:'movement_stiffness'},
        {text:'mucoid_sputum', value:'mucoid_sputum'},
        {text:'muscle_pain', value:'muscle_pain'},
        {text:'muscle_wasting', value:'muscle_wasting'},
        {text:'muscle_weakness', value:'muscle_weakness'},
        {text:'nausea', value:'nausea'},
        {text:'neck_pain', value:'neck_pain'},
        {text:'nodal_skin_eruptions', value:'nodal_skin_eruptions'},
        {text:'obesity', value:'obesity'},
        {text:'pain_behind_the_eyes', value:'pain_behind_the_eyes'},
        {text:'pain_during_bowel_movements', value:'pain_during_bowel_movements'},
        {text:'pain_in_anal_region', value:'pain_in_anal_region'},
        {text:'painful_walking', value:'painful_walking'},
        {text:'palpitations', value:'palpitations'},
        {text:'passage_of_gases', value:'passage_of_gases'},
        {text:'patches_in_throat', value:'patches_in_throat'},
        {text:'phlegm', value:'phlegm'},
        {text:'polyuria', value:'polyuria'},
        {text:'prominent_veins_on_calf', value:'prominent_veins_on_calf'},
        {text:'puffy_face_and_eyes', value:'puffy_face_and_eyes'},
        {text:'pus_filled_pimples', value:'pus_filled_pimples'},
        {text:'receiving_blood_transfusion', value:'receiving_blood_transfusion'},
        {text:'receiving_unsterile_injections', value:'receiving_unsterile_injections'},
        {text:'red_sore_around_nose', value:'red_sore_around_nose'},
        {text:'red_spots_over_body', value:'red_spots_over_body'},
        {text:'redness_of_eyes', value:'redness_of_eyes'},
        {text:'restlessness', value:'restlessness'},
        {text:'runny_nose', value:'runny_nose'},
        {text:'rusty_sputum', value:'rusty_sputum'},
        {text:'scurring', value:'scurring'},
        {text:'shivering', value:'shivering'},
        {text:'silver_like_dusting', value:'silver_like_dusting'},
        {text:'sinus_pressure', value:'sinus_pressure'},
        {text:'skin_peeling', value:'skin_peeling'},
        {text:'skin_rash', value:'skin_rash'},
        {text:'slurred_speech', value:'slurred_speech'},
        {text:'small_dents_in_nails', value:'small_dents_in_nails'},
        {text:'spinning_movements', value:'spinning_movements'},
        {text:'spotting_ urination', value:'spotting_ urination'},
        {text:'stiff_neck', value:'stiff_neck'},
        {text:'stomach_bleeding', value:'stomach_bleeding'},
        {text:'stomach_pain', value:'stomach_pain'},
        {text:'sunken_eyes', value:'sunken_eyes'},
        {text:'sweating', value:'sweating'},
        {text:'swelled_lymph_nodes', value:'swelled_lymph_nodes'},
        {text:'swelling_joints', value:'swelling_joints'},
        {text:'swelling_of_stomach', value:'swelling_of_stomach'},
        {text:'swollen_blood_vessels', value:'swollen_blood_vessels'},
        {text:'swollen_extremeties', value:'swollen_extremeties'},
        {text:'swollen_legs', value:'swollen_legs'},
        {text:'throat_irritation', value:'throat_irritation'},
        {text:'toxic_look_(typhos)', value:'toxic_look_(typhos)'},
        {text:'ulcers_on_tongue', value:'ulcers_on_tongue'},
        {text:'unsteadiness', value:'unsteadiness'},
        {text:'visual_disturbances', value:'visual_disturbances'},
        {text:'vomiting', value:'vomiting'},
        {text:'watering_from_eyes', value:'watering_from_eyes'},
        {text:'weakness_in_limbs', value:'weakness_in_limbs'},
        {text:'weakness_of_one_body_side', value:'weakness_of_one_body_side'},
        {text:'weight_gain', value:'weight_gain'},
        {text:'weight_loss', value:'weight_loss'},
        {text:'yellow_crust_ooze', value:'yellow_crust_ooze'},
        {text:'yellow_urine', value:'yellow_urine'},
        {text:'yellowing_of_eyes', value:'yellowing_of_eyes'},
        {text:'yellowish_skin', value:'yellowish_skin'},

    
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
import { DropDownProps } from "antd";
import { resolveAny } from "dns";
import { ErrorMessage, Formik } from 'formik';
import { observer } from "mobx-react-lite";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Segment, Divider,Form } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { Patient, PatientFormValues } from "../../../app/models/patient";
import { patientprofile } from "../../../app/models/patientprofile";
import doctorStore from "../../../app/stores/doctorStore";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MySelectInput from "../../../app/form/MySelectInput";
import MyTextInput from "../../../app/form/MyTextInput";

interface Props {
    id:string
}

export default observer (function PatientForm({id}:Props){

    const history = useHistory();

    const {patientStore} = useStore();

    const {loading, updatePatient, loadPatient} = patientStore;



    const [theProfile, setProfile]= useState<PatientFormValues>(new PatientFormValues());

    useEffect(()=>{
        if (id) loadPatient(id).then(theProfile=>setProfile(new PatientFormValues(theProfile)))
},[id, loadPatient]);
    
    

    function handleFormSubmit(theProfile) {
        updatePatient(theProfile)
        window.location.reload();
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setProfile({...theProfile, [name]:value})
    }


    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last name is required'),
        birthDate: Yup.string().required('Birth Date is required'),
        address: Yup.string().required('Address is required'),
        language: Yup.string().required('Language is required'),
        city: Yup.string().required('City is required'),
        area: Yup.string().required('Area is required'),
        number: Yup.string().required('Number is required'),
        
    })


    const cityOptions = [
        {text:'Prishtine', value:'Prishtine'},
        {text:'Peja', value:'Peja'}
    ]

    const bloodOptions = [
        {text:'A+', value:'A+'},
        {text:'A-', value:'A-'}
    ]

    return (
        <Segment>
            <Header content='Account Details'></Header>
            <Divider/>
             <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={theProfile} 
                onSubmit={handleFormSubmit}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Group widths={2}>
                        <MyTextInput name='name' placeholder='name...' label='FIRST NAME'/>
                        <MyTextInput name='lastName' placeholder='lastname...'label='LAST NAME'/>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MyTextInput placeholder='address...'  name='address'label='ADDRESS' />
                        <MySelectInput placeholder='city...'  name='city'  options={cityOptions} label='CITY'/>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MyTextInput placeholder='area...'  name='area' label='AREA'/>
                        <MyTextInput placeholder='phonenumber...'  name='number' label='PHONE NUMBER'/>
                        </Form.Group>
                        <Form.Group widths={2}>
                    
                        <MyTextInput placeholder='language...'  name='language' label='LANGUAGE'/>
                        
                        <MyTextInput placeholder='birthdate...'  name='birthDate' label='BIRTH DATE'/>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MySelectInput placeholder='bloodgroup...'  name='bloodGroup' options={bloodOptions} label='BLOOD GROUP'/>
                        <Form.TextArea placeholder='information...'  name='information' value={theProfile.information} onChange={handleInputChange} label='INFORMATION'/>
                        </Form.Group>
                        
                        <Button style={{widths:' 200px'}} 
                            disabled={isSubmitting || !dirty || !isValid }
                            loading={isSubmitting}
                            color='black' type='submit' content='Update Account'
                             />
                             
                    </Form>
            
                )}
            </Formik>
        </Segment>
        
    )
})
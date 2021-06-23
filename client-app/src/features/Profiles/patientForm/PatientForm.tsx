import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { Patient } from "../../../app/models/patient";
import { patientprofile } from "../../../app/models/patientprofile";
import doctorStore from "../../../app/stores/doctorStore";
import { useStore } from "../../../app/stores/store";


export default observer (function PatientForm(){

    const history = useHistory();

    const {patientStore, profileStore, userStore} = useStore();

    const {loading, updatePatient, loadPatient} = patientStore;

    const {id} = useParams<{id: string}>();

    const [theProfile, setProfile]= useState<Patient>({
        id:'',
        name: '',
        lastName: '',
        birthDate: '',
        address:'',
        language:'',
        profession:'',
        doctor: {
            id: '',
            userName:'',
            displayName:'',
            name: '',
            lastName:'',
            education: '',
            yearsExperience: parseInt(''),
            specialization:'',
            qualification:'',
            birthDate:'',
            gender:'',
            bio:'',
            image:'',
        },
        prescriptions:[],
        allergies:[],
        cbCs:[],
        liverPanels:[],
        metabolicPanels:[],
        urinalysisList: [],
        symptoms:[],
        
    });

    useEffect(()=>{
        if (id) loadPatient(id).then(theProfile=>setProfile(theProfile!))
},[id, loadPatient]);
    
    

    function handleSubmit() {
        updatePatient(theProfile).then(()=> history.push(`/profiles/${profileStore.profile?.userName}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setProfile({...theProfile, [name]:value})
    }

    return (
        <Segment>
            <Header content='Add or Edit Additional Information'></Header>
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group unstackable widths={2}>
            <Form.Input label='First name' placeholder='First name' name = 'name' value = {theProfile.name} onChange={handleInputChange}  />
            <Form.Input label='Last name' placeholder='Last name' name = 'lastName' value = {theProfile.lastName} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group widths={2}>
            <Form.Input label='Address' placeholder='Address' name = 'address' value = {theProfile.address} onChange={handleInputChange}/>
            <Form.Input label='Profession' placeholder='Profession'name = 'profession' value = {theProfile.profession} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group widths={2}>
            <Form.Input label='Language' placeholder='Language' name = 'language' value = {theProfile.language} onChange={handleInputChange}/>
            <Form.Input label='Birth Date' placeholder='BirthDate' name = 'birthDate' value = {theProfile.birthDate} onChange={handleInputChange}/>
            </Form.Group>
            
            <Button as={Link} to ={`/profiles/${userStore.user?.userName}`} type='cancel' color='red'>Cancle</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
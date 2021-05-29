import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Doctor } from "../../../app/models/doctor";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";


export default observer (function DoctorForm(){

    const history = useHistory();

    const {doctorStore, profileStore} = useStore();

    const {loading, updateDoctor, loadDoctor} = doctorStore;

    const {id} = useParams<{id: string}>();

    const [theProfile, setProfile]= useState<Doctor>({
        id: '',
        name: '',
        lastName:'',
        education: '',
        yearsExperience: parseInt(''),
        specialization:'',
        qualification:'',
        birthDate:'',
        gender:'',
        patients:[],
    });

    useEffect(()=>{
        if (id) loadDoctor(id).then(theProfile=>setProfile(theProfile!))
},[id, loadDoctor]);
    
    

    function handleSubmit() {
        console.log(id)
        updateDoctor(theProfile).then(()=> history.push(`/profiles/${profileStore.doctor?.userName}`) )
        
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
            <Form.Input label='Specialization' placeholder='Specialization' name = 'specialization' value = {theProfile.specialization} onChange={handleInputChange}/>
            <Form.Input label='Qualification' placeholder='Qualification'name = 'qualification' value = {theProfile.qualification} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group widths={2}>
            <Form.Input label='Education' placeholder='Education' name = 'education' value = {theProfile.education} onChange={handleInputChange}/>
            <Form.Input label='Years Experience' placeholder='yearsExperience' name = 'yearsExperience' value = {theProfile.yearsExperience} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group widths={2}>
            <Form.Input label='Birth Date' placeholder='BirthDate' name = 'birthDate' value = {theProfile.birthDate} onChange={handleInputChange}/>
            <Form.Input label='Gender' placeholder='gender' name = 'gender' value = {theProfile.gender} onChange={handleInputChange}/>
            </Form.Group>
            
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
        </Form>
        </Segment>
    )
})
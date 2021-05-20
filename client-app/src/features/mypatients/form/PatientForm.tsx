import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";


 export default observer (function PatientForm () {

    const {patientStore} = useStore();
    const { selectedPatient, closeForm, createPatient, loading} =patientStore;

    const initialState = selectedPatient ?? {
        id: '',
        name:'',
        lastName:'',
        birthDate: '',
        nationality:'',
        allergies: '',
        profession: '',
        disease: ''
    }

    const [patient, setPatient] = useState(initialState);


    function handleSubmit() {
        createPatient(patient);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const{name, value} = event.target;
        setPatient({...patient, [name] : value})
    }

     return (
         <Segment clearing>
             <Form onSubmit={handleSubmit} autoComplete="off">
                 <Form.Group>
                 <Form.Input placeholder = "Name" value ={patient.name} name = 'name' onChange={handleInputChange}/>
                 <Form.Input placeholder = "Last Name" value ={patient.lastName} name = 'lastName' onChange={handleInputChange}/>
                 </Form.Group>
                 <Form.Input  type = 'date' placeholder = "Birth Date" value ={patient.birthDate} name = 'birthDate' onChange={handleInputChange}/>
                 <Form.Input placeholder = "Nationality" value ={patient.nationality} name = 'nationality' onChange={handleInputChange}/>
                 <Form.Input placeholder = "Profession" value ={patient.profession} name = 'profession' onChange={handleInputChange}/>
                 <Form.Input placeholder = "Disease" value ={patient.disease} name = 'disease' onChange={handleInputChange}/>
                 <Form.Input placeholder = "Allergies" value ={patient.allergies} name = 'allergies' onChange={handleInputChange}/>

                 <Button loading = {loading}  floated ='right' color='blue' type='submit' content='Add Patient'/>
                 <Button onClick ={closeForm} floated ='right' color='red' type='button'  content='Cancel'/>
             </Form>
         </Segment>
     )
 })
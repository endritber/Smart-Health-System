import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Allergy } from "../../../app/models/allergy";
import { useStore } from "../../../app/stores/store";


export default observer (function AllergyForm(){

    const history = useHistory();

    const { allergyStore} = useStore();

    const {loading, createAllergy, updateAllergy, loadAllergy} = allergyStore;

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();
    const {allergyId} = useParams<{allergyId: string}>();

    const [allergy, setAllergy]= useState<Allergy>({
        id: '',
        info: '',
        causes:'',
        treatments:'',
        naturalRemedies:'',
        commonFoodTriggers:'',
    });
    
    useEffect(()=>{
        if (allergyId) loadAllergy(allergyId).then(allergy=>setAllergy(allergy!))
},[allergyId, loadAllergy]);
    
    function handleSubmit() {
        allergy.id? updateAllergy(allergy).then(()=> history.push(`/myPatients/allergies/${patientId}/${doctorId}`))
        
        : createAllergy(allergy,patientId,doctorId).then(()=> history.push(`/myPatients/allergies/${patientId}/${doctorId}`) )
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setAllergy({...allergy, [name]:value})
    }

    return (
        <Segment> { allergy.id?
            <Header content='Edit Allergy'></Header> :
            <Header content='Add Allergy'></Header> }
            <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.TextArea label='Info' placeholder='info...' name = 'info' value = {allergy.info} onChange={handleInputChange}  />
            <Form.Input label='Causes' placeholder='causes...' name = 'causes' value = {allergy.causes} onChange={handleInputChange}/>
            <Form.Input label='Treatments' placeholder='treatments...' name = 'treatments' value = {allergy.treatments} onChange={handleInputChange}/>
            <Form.TextArea label='Natural Remedies' placeholder='ratural remedies...'name = 'naturalRemedies' value = {allergy.naturalRemedies} onChange={handleInputChange} />
            <Form.TextArea label='Common Food Triggers' placeholder='common food triggers...'name = 'commonFoodTriggers' value = {allergy.commonFoodTriggers} onChange={handleInputChange} />
    
            <Button as={Link} to ={`/myPatients/allergies/${patientId}/${doctorId}`} type='cancel' color='red'>Cancel</Button>
            <Button loading={loading} type='submit' color='blue'>Submit</Button>
            
        </Form>
        </Segment>
    )
})
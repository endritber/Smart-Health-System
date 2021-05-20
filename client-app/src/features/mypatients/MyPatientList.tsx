import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


export default observer(function MyPatientList() {
    const {patientStore} = useStore();
    
    const {patientsByDate, deletePatient, loading} = patientStore;
    const [target, setTarget] = useState('');

    function handleDeletePatient(e: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(e.currentTarget.name);
        deletePatient(id);

    }
    return (
        <Segment>
                <Item.Group divided>
                    {patientsByDate.map(patient=> (
                        <Item key ={patient.id} >
                            <Item.Content>
                                <Item.Header as = 'a'>{patient.name}, {patient.lastName}</Item.Header>
                                <Item.Meta>Date of Birth: {patient.birthDate}</Item.Meta>
                                <Item.Description>{patient.nationality}, {patient.profession}</Item.Description>
                                <Item.Extra>
                                    <Button  onClick={()=>patientStore.selectPatient(patient.id)} floated='right' content='View Patient' color="blue"/>
                                    <Button onClick={ (e)=>handleDeletePatient(e, patient.id)}  name = {patient.id} loading={loading && target === patient.id} floated='right' content='Remove Patient' color="red"/>
                                    <Label basic>Disease: {patient.disease}</Label>
                                    <Label basic>Allergies:{patient.allergies}</Label>

                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
        </Segment>
    )
})
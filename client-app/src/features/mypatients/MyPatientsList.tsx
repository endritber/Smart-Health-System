import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Doctor } from "../../app/models/doctor";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";


interface Props {
    doctor: Doctor;
}

export default observer ( function MyPatientsList({doctor}: Props) {

    const {patientStore} = useStore();
    const {selectPatient} = patientStore

    return (
        <Segment>
            <Item.Group divided>
                {doctor.patients.map( patient=> (
                    <Item key={patient.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {patient.name} {patient.lastName}
                            </Item.Header>
                            <Item.Meta>{patient.birthDate}</Item.Meta>
                            <Item.Meta>Address: {patient.address} - Profession: {patient.profession}</Item.Meta>
                            <Item.Description>
                                <div>Languages: {patient.language}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectPatient(patient.id)} content= 'View Patient' color='blue'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
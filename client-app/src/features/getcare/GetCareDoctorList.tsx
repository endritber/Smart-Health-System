import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";




export default observer ( function GetCareDoctorList() {

    const {doctorStore, patientStore, userStore} = useStore();
    const {getDoctors} = doctorStore;
    const {addDoctor,loading} = patientStore


    return (
        <Segment>
            <Item.Group divided>
                {getDoctors.map(doctor=>(
                    <Item key={doctor.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {doctor.name} {doctor.lastName}
                            </Item.Header>
                            <Item.Meta>{doctor.birthDate}</Item.Meta>
                            <Item.Meta>Specialization: {doctor.specialization} - Experience: {doctor.yearsExperience}</Item.Meta>

                            <Item.Description>
                                <div>Qualification: {doctor.qualification}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button loading = {loading} floated ='right' onClick = {()=>addDoctor(userStore.user?.id!, doctor.id)} content= 'Add Doctor' color='blue'/>
                                <Label basic> Gender: {doctor.gender}</Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
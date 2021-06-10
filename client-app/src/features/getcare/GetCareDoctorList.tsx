import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Button, Card, Divider, Feed, Header, Icon, Image, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";




export default observer ( function GetCareDoctorList() {

    const {doctorStore, patientStore, userStore} = useStore();
    const {getDoctors} = doctorStore;
    const {addDoctor,loading} = patientStore


    return (
        <>
        <div>
        <Header sub>Profiles</Header>    
        <Header as='h2' >Doctors</Header></div>
            {getDoctors.map(doctor=>(
        <Card style={{display:"inline-block", marginRight:40, width:"505px", "border-radius": "15px"}}>
            
            <Card.Content>
            <Image circular src='/images/avatar/large/patrick.png' />
             <Card.Header as='a'>{doctor.name} {doctor.lastName}</Card.Header>
             <Label>{doctor.specialization}</Label>
            <Divider/>
            <Card.Meta>{doctor.birthDate}</Card.Meta>
            <Card.Meta>Gender: {doctor.gender}</Card.Meta>
            <Card.Description>
                {doctor.specialization}, {doctor.education}
            </Card.Description>
            <Card.Description>
                {doctor.qualification}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='sort' />
                Experinence: {doctor.yearsExperience} years
                <Button loading = {loading} floated ='right' content= {`Add Appointmet to ${doctor.name}`}color='blue'/>
            </Card.Content>
        </Card>

            ))}
        </>
    )
})
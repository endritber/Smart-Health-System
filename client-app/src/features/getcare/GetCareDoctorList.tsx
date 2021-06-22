import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Divider, Feed, Header, Icon, Image, Item, Label, Input } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";




export default observer ( function GetCareDoctorList() {

    const {doctorStore, patientStore, userStore} = useStore();
    const {getDoctors} = doctorStore;
    const {addDoctor,loading} = patientStore

    const [searchTerm, setSearchTerm] = useState("");


    return (
        <>
        <div>
        <Header sub>Profiles</Header>    
        <Header as='h2' >Search a Doctor</Header></div><br/>
        <Input style={{"border-radius":"100px", "width": "528px"}}
    icon={{ name: 'search', circular: true, link: true }}
    placeholder='Search...' fluid
    onChange={(event)=> {setSearchTerm(event.target.value)}}
    />
        {getDoctors.filter((val) =>{
            if (searchTerm=="") {
                return val
            } else if ((val.name.toLowerCase() + " " + val.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) ||
             val.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
             val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             val.yearsExperience.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                return val.name
            }
        })
            
            .map(doctor=>(
        <Card style={{display:"inline-block", marginRight:40, width:"523.5px", "border-radius": "15px"}}>
            
            <Card.Content>
            <Image circular src='/images/avatar/large/patrick.png' />
            <br/>
             <Card.Header as='a'>{doctor.name} {doctor.lastName}</Card.Header>
             <br/>
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
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useParams } from "react-router";
import { Button, Header, Label, Segment, Card, Image, Divider, Input } from "semantic-ui-react";
import { Doctor } from "../../app/models/doctor";
import { useStore } from "../../app/stores/store";
import UserStore from "../../app/stores/userStore";


interface Props {
    doctor: Doctor;
}

export default observer ( function MyPatientsList({doctor}: Props) {

    const {patientStore} = useStore();
    const {selectPatient, loading} = patientStore
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
         <Header as='h3' >Search a Patient</Header>

            <Input style={{"border-radius":"100px", "width": "300px"}}
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search...' fluid
            onChange={(event)=> {setSearchTerm(event.target.value)}}
            loading={loading}

            />
        <Segment>
                <div>
        <Header sub>Profiles</Header>    
        <Header as='h2' >My Patients</Header></div>
       
            {doctor.patients.filter(
             (val) =>{
                if (searchTerm=="") {
                    return val
                } else if ((val.name.toLowerCase() + " " + val.lastName.toLowerCase()).includes(searchTerm.toLowerCase()) ||
                 val.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val.name
                }
            }).map(patient=>(
        <Card style={{marginRight:40,marginTop:40, width:"663px", "border-radius": "15px"}}>
            
            <Card.Content>
            <Image circular src='/images/avatar/large/patrick.png' />
             <Card.Header as='a'>{patient.name} {patient.lastName}</Card.Header>
             <br/>
             Address:  <Label>{patient.address}</Label>
            <Divider/>
            <Card.Meta>Birth Date: {patient.birthDate}</Card.Meta>
            <Card.Description>
                Language Speaking: {patient.language}
            </Card.Description>
            <Card.Description>
                Profession: {patient.profession}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button onClick={()=>selectPatient(patient.id)} content = "View Patient" color='black'/>
            </Card.Content>
            
        </Card>
        
            ))}
    
        </Segment>
        </>
    )
})
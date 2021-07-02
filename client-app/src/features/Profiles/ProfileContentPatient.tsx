import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Tab, Card, Icon, Image, Label, Divider } from "semantic-ui-react"
import { patientUser } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: patientUser;
    
}


export default observer( function ProfileContentPatient ({profile}:Props) {

        const {patientStore} = useStore();
        const {loadPatient, selectedPatient} = patientStore
        
        useEffect(()=>{
            loadPatient(profile.id)
        }, [loadPatient]);

        const panes = [

        {menuItem: 'My Doctor', render : () => <Tab.Pane>
            <Card style={{display:"inline-block", marginRight:40, width:"523.5px", "border-radius": "15px"}}>
            
            <Card.Content>
            <Image circular src='/images/avatar/large/patrick.png' />
            <br/>
             <Card.Header as='a'>{selectedPatient?.doctor.name} {selectedPatient?.doctor.lastName}</Card.Header>
             <br/>
             <Label>{selectedPatient?.doctor.specialization}</Label>
            <Divider/>
            <Card.Meta>{selectedPatient?.doctor.birthDate}</Card.Meta>
            <Card.Meta>Gender: {selectedPatient?.doctor.gender}</Card.Meta>
            <Card.Description>
                {selectedPatient?.doctor.specialization}, {selectedPatient?.doctor.education}
            </Card.Description>
            <Card.Description>
                {selectedPatient?.doctor.qualification}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='sort' />
                Experinence: {selectedPatient?.doctor.yearsExperience} years
            </Card.Content>
        </Card>

            
        </Tab.Pane>},
        {menuItem: 'Information', render : () => <Tab.Pane>{selectedPatient?.information}</Tab.Pane>},
        {menuItem: 'Appointments', render : () => <Tab.Pane>Appointments</Tab.Pane>},


    ];

    return (
        <Tab  menu = {{vertical:false, panes:true}}
        menuPosition='right'
        panes={panes}
        />
    )
})
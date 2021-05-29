import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Tab } from "semantic-ui-react"
import { patientUser } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: patientUser;
    
}


export default observer( function ProfileContentPatient ({profile}:Props) {

        const {id} = useParams<{id: string}>();

        const {patientStore} = useStore();
        const {loadPatient, selectedPatient} = patientStore
        
        useEffect(()=>{
            loadPatient(profile.id)
        }, [loadPatient]);

        const panes = [
        {menuItem: 'Add or Edit Additional Information', render : () => <Tab.Pane>
            <Button as={Link} to={`/addInformation/${profile.id}`} primary content='Add or Edit Additional Information'></Button>
        </Tab.Pane>},
        {menuItem: 'My Doctor', render : () => <Tab.Pane>
            {selectedPatient?.doctor.name}
            
        </Tab.Pane>},
        {menuItem: 'About', render : () => <Tab.Pane>Personal Info</Tab.Pane>},
        {menuItem: 'Appointments', render : () => <Tab.Pane>Appointments</Tab.Pane>},

    ];

    return (
        <Tab menu = {{fluid:true, vertical:true}}
        menuPosition='right'
        panes={panes}
        />
    )
})
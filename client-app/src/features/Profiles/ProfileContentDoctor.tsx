import { Link } from "react-router-dom";
import { Button, Card, Tab } from "semantic-ui-react"
import { doctorUser } from "../../app/models/user";

interface Props {
    profile: doctorUser;
}


export default function ProfileContentDoctor ({profile}:Props) {

        const panes = [
        {menuItem: 'Add or Edit Additional Information', render : () => <Tab.Pane>
            <Button as={Link} to={`/addDoctorInformation/${profile.id}`} primary content='Add or Edit Additional Information'></Button>
        </Tab.Pane>},
        {menuItem: 'My Patients', render : () => <Tab.Pane>
             <Card 
                                    href=''
                                    header='Here is going to be ...'
                                    meta='Doctor'
                                    description='description'
                                />
        </Tab.Pane>},
        {menuItem: 'About', render : () => <Tab.Pane>Personal Info</Tab.Pane>},
        {menuItem: 'Messages', render : () => <Tab.Pane>Messages</Tab.Pane>},

    ];

    return (
        <Tab menu = {{fluid:true, vertical:true}}
        menuPosition='right'
        panes={panes}
        />
    )
}
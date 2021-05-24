import { Tab } from "semantic-ui-react"

export default function ProfileContentPatient () {

    const panes = [
        {menuItem: 'About', render : () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: 'My Doctor', render : () => <Tab.Pane>My Doctor</Tab.Pane>},
        {menuItem: 'Personal Info', render : () => <Tab.Pane>Personal Info</Tab.Pane>},
        {menuItem: 'Appointments', render : () => <Tab.Pane>Appointments</Tab.Pane>},

    ];

    return (
        <Tab menu = {{fluid:true, vertical:true}}
        menuPosition='right'
        panes={panes}
        />
    )
}
import { identity } from "lodash";
import { observer } from "mobx-react-lite";
import { Button, Card, Divider, Grid, Header, Icon, Item, Label, Reveal, Segment, Statistic, Image } from "semantic-ui-react";
import { idText } from "typescript";
import { patientprofile } from "../../app/models/patientprofile";
import PatientForm from "./patientForm/PatientForm";

interface Props {
    id:string
}

export default  observer (function ProfileHeaderPatient ({id}: Props){
    return (
        <>
        <Header sub>My Profile</Header>
        <Segment>
            <PatientForm id={id}/>
        </Segment>
        </>
    )
})
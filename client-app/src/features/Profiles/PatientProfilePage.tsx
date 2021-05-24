import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContentPatient from "./ProfileContentPatient";
import ProfileHeaderPatient from "./ProfileHeaderPatient";

export default observer( function PatientProfilePage (){

    const {username} = useParams<{username: string}>();

    const {profileStore} = useStore();

    const {loadingProfile, loadProfile, profile} =profileStore;

    useEffect(() => {
        loadProfile(username);
    }, [loadProfile, username])

    if (loadingProfile == true) return <LoadingComponent content='Loading Profile...'/>

    return (
    <Grid>
           <Grid.Column width={16}>
               {profile &&
               <ProfileHeaderPatient profile = {profile}/>}
               <ProfileContentPatient/>
           </Grid.Column>
       </Grid>
    )
})
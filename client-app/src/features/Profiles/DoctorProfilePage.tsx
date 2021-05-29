import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContentDoctor from "./ProfileContentDoctor";
import ProfileHeaderDoctor from "./ProfileHeaderDoctor";


export default observer( function DoctorProfilePage (){

    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();

    const {loadingProfile, loadDocProfile, doctor} = profileStore;

    useEffect(() => {
        loadDocProfile(username);
    }, [loadDocProfile, username])

    if (loadingProfile === true) return <LoadingComponent content='Loading Profile...'/>

    return (
        <>
    <Grid>
           <Grid.Column width={16}>
               {doctor &&
               <ProfileHeaderDoctor profile = {doctor}/>}
               {doctor &&
               <ProfileContentDoctor profile = {doctor}/>}
           </Grid.Column>
       </Grid>
       </>
    )
})
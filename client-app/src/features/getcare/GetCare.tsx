import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import GetCareDoctorDashBoard from "./GetCareDoctorDashBoard";

export default observer(function GetCare() {

    const {doctorStore, userStore} = useStore();

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        doctorStore.loadDoctors();
      }, [doctorStore])

    if (doctorStore.loadingInitial) return <LoadingComponent content='Loading Doctors...'/>

    return (
        <>
        <Container style={{marginTop:"7em"}}>
            <GetCareDoctorDashBoard/>
        </Container>
        </>
    )
})
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import MyPatientsDashBoard from "./MyPatientsDashBoard";

export default observer(function MyPatients() {

    const {doctorStore, patientStore} = useStore();

    const {selectedDoctor} = doctorStore

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        doctorStore.loadDoctor(id);
        patientStore.loadPatients();
      }, [doctorStore, patientStore])

    if (doctorStore.loadingInitial) return <LoadingComponent content='Loading Patients...'/>

    return (
        <>
        <Container style={{marginTop:"7em"}}>
            { selectedDoctor &&
            <MyPatientsDashBoard doctor = {selectedDoctor}
            />}
        </Container>
        </>
    )
})
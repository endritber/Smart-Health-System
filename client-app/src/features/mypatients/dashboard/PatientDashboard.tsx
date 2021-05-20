import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { LabResult } from "../../../app/models/labresult";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";
import PatientDetails from "../details/PatientDetails";
import PatientForm from "../form/PatientForm";
import MyPatientList from "../MyPatientList";



export default observer (function PatientDashboard () {
    const {patientStore} = useStore();
    const {selectedPatient, editMode} = patientStore

    useEffect(() => {
      patientStore.loadPatients();
    }, [patientStore])
  
  if (patientStore.loadingInitial) return <LoadingComponent content='Loading...' />
    return ( 
        <Grid>
            <Grid.Column width="10">
                <MyPatientList/>
            </Grid.Column>
            <GridColumn width="6">
            { selectedPatient && !editMode &&
                <PatientDetails />}
            {editMode &&  
            <PatientForm />}
            </GridColumn>
        </Grid>
    )
})
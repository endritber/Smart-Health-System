
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { Doctor } from '../../app/models/doctor';
import { Patient } from '../../app/models/patient';
import { patientprofile } from '../../app/models/patientprofile';
import { useStore } from '../../app/stores/store';
import MyPatientsList from './MyPatientsList';
import MyPatientDetail from './patientDetail/MyPatientDetail';

interface Props {
    doctor: Doctor
}

export default observer (function MyPatientsDashBoard({doctor}: Props) {

    const {doctorStore} = useStore();
    return (
        <Grid>
            <Grid.Column width='10'>
                {doctor &&
                <MyPatientsList doctor = {doctor}/>}
            </Grid.Column>
            <Grid.Column width='6'>
                <MyPatientDetail/>
            </Grid.Column>
        </Grid>

    )

})
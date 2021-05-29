
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import GetCareDoctorList from './GetCareDoctorList';


export default observer (function GetCareDoctorDashBoard() {

    const {doctorStore} = useStore();
    const {selectedDoctor} = doctorStore

    return (
        <Grid>
            <Grid.Column width='10'>
                <GetCareDoctorList/>
            </Grid.Column>
        </Grid>

    )

})
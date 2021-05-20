
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { LabResult } from '../../../app/models/labresult'
import { useStore } from '../../../app/stores/store'
import LabResultDetail from './details/LabResultDetail'
import LabResultList from './LabResultList'




export default  observer (function LabResultDashboard() {

    const {labResultStore} = useStore();
    const {selectedLabResult, editMode} = labResultStore

    return (
        <Grid>
            <Grid.Column width='9'>
                <LabResultList
                />
            </Grid.Column>
               
            <Grid.Column width='6'>
            {
                selectedLabResult && 
                <LabResultDetail />}
            </Grid.Column>
        </Grid>

    )

})
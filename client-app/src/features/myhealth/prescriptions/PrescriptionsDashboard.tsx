
import { Grid } from 'semantic-ui-react'
import { LabResult } from '../../../app/models/labresult'
import { Prescription } from '../../../app/models/prescription'
import PrescreptionList from './PrescriptionList'

interface Props {
    prescriptions: Prescription[];
}

export default function PrescriptionDashboard({prescriptions}: Props) {

    return (
        <Grid>
            <Grid.Column width='15'>
                    <PrescreptionList prescriptions={prescriptions}/>
            </Grid.Column>
    
        </Grid>

    )

}
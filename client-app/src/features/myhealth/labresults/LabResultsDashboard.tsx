
import { Grid } from 'semantic-ui-react'
import { LabResult } from '../../../app/models/labresult'
import LabResultDetail from './details/LabResultDetail'
import LabResultList from './LabResultList'


interface Props {
    labresults: LabResult[];
    selectedLabResult: LabResult | undefined;
    selectLabResult: (id: string)=> void;
    cancelSelectLabResult: () => void;
}

export default function LabResultDashboard({labresults, selectLabResult, selectedLabResult, cancelSelectLabResult}: Props) {

    return (
        <Grid>
            <Grid.Column width='9'>
                <LabResultList labresults={labresults}
                selectLabResult= {selectLabResult}
                />
            </Grid.Column>
               
            <Grid.Column width='6'>
            {
                selectedLabResult && 
                <LabResultDetail labresult={selectedLabResult}
                    cancelSelectLabResult={cancelSelectLabResult}
                />}
            </Grid.Column>
        </Grid>

    )

}
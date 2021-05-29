import { Container } from 'semantic-ui-react';
import LabResultsDashboard from './LabResultsDashboard';
import { useEffect, useState } from 'react';
import { LabResult } from '../../../app/models/labresult'; 
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

export default observer (function LabResults() {

  const {labResultStore} = useStore();

  useEffect(() => {
    labResultStore.loadLabResults();

  }, [labResultStore])



  if (labResultStore.loadingInitial) return <LoadingComponent content='Loading Lab Results...'/>

  return (
    <>
    <Container style={{marginTop:"7em"}}>
        <LabResultsDashboard />
    </Container>
    </>
  )
  })

import { Container } from 'semantic-ui-react';
import LabResultsDashboard from './LabResultsDashboard';
import { useEffect, useState } from 'react';
import { LabResult } from '../../../app/models/labresult';
import axios from 'axios';

export default function LabResults() {
  const [labresults, setlabresults] = useState<LabResult[]>([]);
  const[selectedLabResult, setSelectedLabResult] = useState<LabResult|undefined>(undefined);

  useEffect(() => {
    axios.get<LabResult[]>("http://localhost:5000/api/labresults").then(response => {
      setlabresults(response.data)
    })
  }, [])


  function handleSelectedLabResult(id: string) {
      setSelectedLabResult(labresults.find(x=>x.id === id))
  }

  function handleCancelSelectLabResult() {
    setSelectedLabResult(undefined);
  }

  return (
    <>
    <Container style={{marginTop:"7em"}}>
        <LabResultsDashboard labresults =  {labresults}
        selectLabResult = {handleSelectedLabResult}
        selectedLabResult = {selectedLabResult}
        cancelSelectLabResult ={handleCancelSelectLabResult}
        />
  
    </Container>
    </>
  )
  }

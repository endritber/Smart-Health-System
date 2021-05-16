import { Container } from 'semantic-ui-react';


import { useEffect, useState } from 'react';

import axios from 'axios';
import { Prescription } from '../../../app/models/prescription';
import PrescriptionDashboard from './PrescriptionsDashboard';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    axios.get<Prescription[]>("http://localhost:5000/api/prescriptions").then(response => {
      setPrescriptions(response.data)
    })
  }, [])


//   function handleSelectedLabResult(id: string) {
//       setSelectedLabResult(labresults.find(x=>x.id === id))
//   }

//   function handleCancelSelectLabResult() {
//     setSelectedLabResult(undefined);
//   }

  return (
    <>
    <Container style={{marginTop:"7em"}}>
        <PrescriptionDashboard prescriptions={prescriptions}/>
    </Container>
    </>
  )
  }

import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

import { Patient } from '../../app/models/patient';
import PatientDashboard from './dashboard/PatientDashboard';
import DoctorNavBar from '../../app/layout/DoctorNavBar';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';


export default observer (function Patients() {


  return (

    <Container style={{marginTop:"7em"}}>
    <DoctorNavBar/>
        <PatientDashboard />
    </Container>
  )
  })

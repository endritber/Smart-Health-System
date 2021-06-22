import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import MyHealthList from '../../features/myhealth/MyHealthList';
import { Route,useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import SummaryList from '../../features/summary/SummaryList';
import GetCare from '../../features/getcare/GetCare';
import Messages from '../../features/messages/Messages';
import DiseasePrediction from '../../features/diseaseprediction/DiseasePrediction';
import { observer } from 'mobx-react-lite';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import ModalContainer from '../modals/ModalContainer';
import DoctorNavBar from './DoctorNavBar';
import PatientProfilePage from '../../features/Profiles/PatientProfilePage';
import PatientForm from '../../features/Profiles/patientForm/PatientForm';
import DoctorProfilePage from '../../features/Profiles/DoctorProfilePage';
import DoctorForm from '../../features/Profiles/doctorForm/DoctorForm';
import MyPatients from '../../features/mypatients/MyPatients';
import MyPatientDetail from '../../features/mypatients/patientDetail/MyPatientDetail';
import LabResultsList from '../../features/mypatients/patientLabResults/LabResultsList';
import LoadingComponent from './LoadingComponent';
import PrescriptionsList from '../../features/mypatients/patientPrescriptions/PrescriptionsList';
import PrescriptionForm from '../../features/mypatients/prescriptionForm/PrescriptionForm';
import AllergiesList from '../../features/mypatients/patientAllergies/AllergiesList';
import AllergyForm from '../../features/mypatients/allergyForm/AllergyForm';
import CBCForm from '../../features/mypatients/cbcForm/CBCForm';
import LiverPanelForm from '../../features/mypatients/liverpanelForm/LiverPanelForm';
import MetabolicPanelForm from '../../features/mypatients/metabolicpanelForm/MetabolicPanelForm';
import UrinalysisForm from '../../features/mypatients/urinalysisForm/UrinalysisForm';
import CBCGraphs from '../../features/mypatients/labresultGraph/CBCGraphs';
import LiverPanelGraphs from '../../features/mypatients/labresultGraph/LiverPanelGraphs';
import LabResults from '../../features/myhealth/labresults/LabResults';
import MyPrescriptions from '../../features/myhealth/prescriptions/MyPrescriptions';
import PatientAllergyTable from '../../features/myhealth/allergies/PatientAllergyTable';






function App() {

  const { commonStore, userStore} = useStore();


  useEffect (()=>{
    if(commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded())

    } else {
      commonStore.setAppLoaded();
    }
  },[commonStore, userStore])

  const location = useLocation();

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
  return (

    <>
    {userStore.user?.roleId === 1 ? (
      <>
    <Route exact path='/' component={HomePage}/>
     <ModalContainer/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
    <NavBar/>
    <Container style={{marginTop:"7em"}}> 
        <Route exact path='/myhealthlist' component={MyHealthList}/>
        <Route path='/summarylist' component={SummaryList}/>
        <Route path='/getcare' component={GetCare}/>
        <Route path='/messages' component={Messages}/>
        <Route path='/diseaseprediction' component={DiseasePrediction}/>
        <Route path='/myhealthlist/labresults/:id' component={LabResults}/>
        <Route path='/profiles/:username' component={PatientProfilePage}/>
        <Route path='/myhealthlist/prescriptions/:id' component={MyPrescriptions}/>
        <Route path='/myhealthlist/allergies/:patientId' component={PatientAllergyTable}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/addInformation/:id'  component={PatientForm}/>
        <Route path='/patientDetail/:id'  component={MyPatientDetail}/>
    </Container>
    </>
  )}
  />
  
  </>) : (
    <>

    
    <Route exact path='/' component={HomePage}/>
        <ModalContainer/>
          <Route 
          path={'/(.+)'}
          render={()=>(
            <>
    <DoctorNavBar/>
        <Container style={{marginTop:"7em"}}> 
        <Route exact path='/myPatients/:id' component={MyPatients}/>
        <Route path='/profiles/:username' component={DoctorProfilePage}/>
        <Route path='/addDoctorInformation/:id' component={DoctorForm}/>
        <Route path='/myPatients/labResults/:patientId/:doctorId' component={LabResultsList}/>
        <Route path={['/cbcForm/:patientId/:doctorId', '/manageCBC/:patientId/:doctorId/:CBCId']} component={CBCForm}/>
        <Route path={['/liverPanelForm/:patientId/:doctorId', '/manageLiverPanel/:patientId/:doctorId/:LiverPanelId']} component={LiverPanelForm}/>
        <Route path={['/metabolicPanelForm/:patientId/:doctorId', '/manageMetabolicPanel/:patientId/:doctorId/:MetabolicPanelId']} component={MetabolicPanelForm}/>
        <Route path={['/urinalysisForm/:patientId/:doctorId', '/manageUrinalysis/:patientId/:doctorId/:UrinalysisId']} component={UrinalysisForm}/>
        <Route path='/myPatients/prescriptions/:patientId/:doctorId' component={PrescriptionsList}/>
        <Route path={['/prescriptionsForm/:patientId/:doctorId', '/managePrescription/:patientId/:doctorId/:prescriptionId']} component={PrescriptionForm}/>
        <Route path='/myPatients/allergies/:patientId/:doctorId' component={AllergiesList}/>
        
        <Route path={['/allergyForm/:patientId/:doctorId', '/manageAllergy/:patientId/:doctorId/:allergyId']} component={AllergyForm}/>
        <Route path='/cbcgraph/:patientId' component={CBCGraphs}/>
        <Route path='/liverpanelgraph/:patientId' component={LiverPanelGraphs}/>
        
        
        </Container>
        </>
  )}
  />
</>
  )}

</>
);
}

export default observer(App);

import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import MyHealthList from '../../features/myhealth/MyHealthList';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import SummaryList from '../../features/summary/SummaryList';
import GetCare from '../../features/getcare/GetCare';
import Messages from '../../features/messages/Messages';
import DiseasePrediction from '../../features/diseaseprediction/DiseasePrediction';
import { observer } from 'mobx-react-lite';
import LabResults from '../../features/myhealth/labresults/LabResults';
import Prescriptions from '../../features/myhealth/prescriptions/Prescriptions';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import ModalContainer from '../modals/ModalContainer';
import DoctorNavBar from './DoctorNavBar';
import PatientProfilePage from '../../features/Profiles/PatientProfilePage';



function App() {

  const { commonStore, userStore} = useStore();


  useEffect (()=>{
    if(commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded())

    } else {
      commonStore.setAppLoaded();
    }
  },[commonStore, userStore])


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
        <Route path='/myhealthlist/labresults' component={LabResults}/>
        <Route path='/profiles/:username' component={PatientProfilePage}/>
        <Route path='/myhealthlist/prescriptions' component={Prescriptions}/>
        <Route path='/login' component={LoginForm}/>
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
  
        <Route />

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

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

function App() {


  return (
    <>
    <NavBar/>
    <Container style={{marginTop:"7em"}}>
        <Route exact path='/' component={HomePage}/>  
        <Route exact path='/myhealthlist' component={MyHealthList}/>
        <Route path='/summarylist' component={SummaryList}/>
        <Route path='/getcare' component={GetCare}/>
        <Route path='/messages' component={Messages}/>
        <Route path='/diseaseprediction' component={DiseasePrediction}/>
        <Route path='/myhealthlist/labresults' component={LabResults}/>
        <Route path='/myhealthlist/prescriptions' component={Prescriptions}/>
    </Container>
    </>
  )
  }
export default observer(App);

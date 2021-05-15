import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import MyHealthList from '../../features/myhealth/MyHealthList';



function App() {

  return (
    <>
    <NavBar/>
    <Container style={{marginTop:"7em"}}>
        <MyHealthList/>
    </Container>
    </>
  )
  }
export default App;

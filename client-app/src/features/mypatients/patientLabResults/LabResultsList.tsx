import { observer } from "mobx-react-lite";
import { scroller } from "react-scroll";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Divider, Header, Modal, Segment , Icon} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LiverPanelGraphs from "../labresultGraph/LiverPanelGraphs";
import CBCGraphs from "../labresultGraph/CBCGraphs";
import CBCForm from "../cbcForm/CBCForm";
import { stringifyConfiguration } from "tslint/lib/configuration";
import MetabolicPanelForm from "../metabolicpanelForm/MetabolicPanelForm";
import LiverPanelForm from "../liverpanelForm/LiverPanelForm";
import UrinalysisForm from "../urinalysisForm/UrinalysisForm";



export default observer (function LabResultsList() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();
    

    const {patientStore, cbcStore, metabolicpanelStore, liverpanelStore, urinalysisStore,modalStore } = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deletecbc, loading} = cbcStore
    const {deletemetabolicpanel} = metabolicpanelStore
    const {deleteLiverPanel} = liverpanelStore
    const {deleteurinalysis} = urinalysisStore

    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

    if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Lab Results...`}/>

      

      function handleCBCDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
            setTarget(e.currentTarget.name)
            deletecbc(id)
      }

      function handleMetabolicPanelDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deletemetabolicpanel(id)
  }


  function handleLiverPanelDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteLiverPanel(id)
}

function handleUrinalysisDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
setTarget(e.currentTarget.name)
deleteurinalysis(id)
};


function scrollToLiverPanel() {
  scroller.scrollTo("liverPanel", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};
function scrollToUrinalysis() {
  scroller.scrollTo("urinalysis", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};
function scrollToMetabolicPanel() {
  scroller.scrollTo("metabolicPanel", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};



    return (

      <>
      <Header sub>{selectedPatient?.name} {selectedPatient?.lastName}'s Laboratory Results</Header>
      <br/> 
      <Button.Group fluid> 
          <Button size='large' color='black' onClick={scrollToMetabolicPanel}>
                    Scroll to Metabolic Panel</Button>
           <Button.Or/>
            <Button size='large' color='black' onClick={scrollToLiverPanel}>
                    Scroll to Liver Panel
            </Button>
            <Button.Or/>
            <Button size='large' color='black' onClick={scrollToUrinalysis}>
                    Scroll to Urinalysis
            </Button>
                    
        </Button.Group>
       
          
      <Segment>
      <Segment>
            <Header>
          <Header>Add CBCs Results</Header>
        <Button style={{width:"130px"}} color='black' onClick={()=>{modalStore.openModal(<CBCForm patientId={patientId} doctorId={doctorId} CBCId={''}/>, 'small')}}>
                <Icon name='add'/>
        </Button></Header>
        <Header>
        <Header>View {selectedPatient?.name}'s CBCs Graph Results</Header>
        <Button size='large' color='teal' onClick={()=>{modalStore.openModal(<CBCGraphs/>, 'large')}}>
                    Plot Results
          </Button></Header></Segment> 
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <Header>Table of CBCs</Header>
          <TableRow>
            <TableCell>Date Added (yyyy-mm-dd)</TableCell>
            <TableCell align="right">WBC (ml)</TableCell>
            <TableCell align="right">Band Forms (%)</TableCell>
            <TableCell align="right">Lymphocytes (%)</TableCell>
            <TableCell align="right">Monocytes (%)</TableCell>
            <TableCell align="right">Basoghilis (%)</TableCell>
            <TableCell align="right">Hemoglobin (%)</TableCell>
            <TableCell align="right">Hematocrit (%)</TableCell>
            <TableCell align="right">Platelet Count (%)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPatient?.cbCs.map(cbc => (
            <TableRow key={cbc.id}>
              <TableCell component="th" scope="row">
                {cbc.date}
              </TableCell>
              <TableCell align="right">{cbc.wbc}</TableCell>
              <TableCell align="right">{cbc.bandForms}</TableCell>
              <TableCell align="right">{cbc.lymphocytes}</TableCell>
              <TableCell align="right">{cbc.monocytes}</TableCell>
              <TableCell align="right">{cbc.basoghilis}</TableCell>
              <TableCell align="right">{cbc.hemoglobin}</TableCell>
              <TableCell align="right">{cbc.hematocrit}</TableCell>
              <TableCell align="right">{cbc.plateletCount}</TableCell>
              <TableCell align="right">
              <Card.Content extra>
            <Button.Group>
                <Button  color='black' onClick={()=>{modalStore.openModal(<CBCForm patientId={patientId} doctorId={doctorId} CBCId={cbc.id}/>,'small')}} >
                    Edit
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={cbc.id}
            loading={loading && target===cbc.id}
            onClick={(e)=>handleCBCDelete(e, cbc.id)}
            color='red'
          />
        </Modal.Actions>
      </Modal>
                </Button.Group>
            </Card.Content>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Segment>

<Divider/>


<Segment className="metabolicPanel">
      <Segment>
            <Header>
          <Header>Add Metabolic Panel Results</Header>
        <Button style={{width:"130px"}} color='black' onClick={()=>{modalStore.openModal(<MetabolicPanelForm patientId={patientId} doctorId={doctorId} MetabolicPanelId={''}/>, 'small')}}>
           <Icon name='add'/>
        </Button></Header>
        </Segment>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
        <Header>Table of Metabolic Panel</Header>
          <TableRow>
            <TableCell>Date Added (yyyy-mm-dd)</TableCell>
            <TableCell align="right">Glucose (mg/Dl)</TableCell>
            <TableCell align="right">Bun (mg/Dl)</TableCell>
            <TableCell align="right">Protein (g/Dl)</TableCell>
            <TableCell align="right">Albumin (g/Dl)</TableCell>
            <TableCell align="right">Calcium (mg/Dl)</TableCell>
            <TableCell align="right">Globulin (g/Dl)</TableCell>
            <TableCell align="right">Carbon Dioxide (mmol/L)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPatient?.metabolicPanels.map(mp => (
            <TableRow key={mp.id}>
              <TableCell component="th" scope="row">
                {mp.date}
              </TableCell>
              <TableCell align="right">{mp.glucose}</TableCell>
              <TableCell align="right">{mp.bun}</TableCell>
              <TableCell align="right">{mp.protein}</TableCell>
              <TableCell align="right">{mp.albumin}</TableCell>
              <TableCell align="right">{mp.calcium}</TableCell>
              <TableCell align="right">{mp.globulin}</TableCell>
              <TableCell align="right">{mp.carbonDioxide}</TableCell>
              <TableCell align="right">
              <Card.Content extra>
            <Button.Group>
                <Button onClick={()=>{modalStore.openModal(<MetabolicPanelForm patientId={patientId} doctorId={doctorId} MetabolicPanelId={mp.id}/>, 'small')}} color='black'>
                    Edit
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={mp.id}
            loading={loading && target===mp.id}
            onClick={(e)=>handleMetabolicPanelDelete(e, mp.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
                </Button.Group>
            </Card.Content>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Segment>


<Segment className='liverPanel'>
      <Segment>
            <Header>
          <Header>Add Liver Panel Results</Header>
        <Button style={{width:"130px"}} color='black' onClick={()=>{modalStore.openModal(<LiverPanelForm patientId={patientId} doctorId={doctorId} LiverPanelId={''}/>, 'small')}} >
        <Icon name='add'/>
        </Button></Header>
        <Header>
        <Header>View {selectedPatient?.name}'s Liver Panel Graph Results</Header>
        <Button size='large' color='teal' onClick={()=>{modalStore.openModal(<LiverPanelGraphs/>, 'large')}}>
        Plot Results
          </Button></Header></Segment> 
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
        <Header>Table of Liver Panel</Header>
          <TableRow>
            <TableCell>Date Added (yyyy-mm-dd)</TableCell>
            <TableCell align="right">Total BiliRubin (mg/Dl)</TableCell>
            <TableCell align="right">Direct BiliRubin (mg/Dl)</TableCell>
            <TableCell align="right">SGOT (IU/L)</TableCell>
            <TableCell align="right">SGPT (IU/L)</TableCell>
            <TableCell align="right">Alkaline Phosp Phatase (IU/L)</TableCell>

            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPatient?.liverPanels.map(lp => (
            <TableRow key={lp.id}>
              <TableCell component="th" scope="row">
                {lp.date}
              </TableCell>
              <TableCell align="right">{lp.totalBiliRubin}</TableCell>
              <TableCell align="right">{lp.directBiliRubin}</TableCell>
              <TableCell align="right">{lp.sgot}</TableCell>
              <TableCell align="right">{lp.sgpt}</TableCell>
              <TableCell align="right">{lp.alkalinePhosPhatase}</TableCell>
              <TableCell align="right">
              <Card.Content extra>
            <Button.Group>
                <Button onClick={()=>{modalStore.openModal(<LiverPanelForm patientId={patientId} doctorId={doctorId} LiverPanelId={lp.id}/>, 'small')}}  color='black'>
                    Edit
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={lp.id}
            loading={loading && target===lp.id}
            onClick={(e)=>handleLiverPanelDelete(e, lp.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
                </Button.Group>
            </Card.Content>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Segment>


    <Segment className='urinalysis'>
      <Segment>
            <Header>
          <Header>Add Urinalysis Results</Header>
        <Button style={{width:"130px"}} color='black' onClick={()=>{modalStore.openModal(<UrinalysisForm patientId={patientId} doctorId={doctorId} UrinalysisId={''}/>, 'small')}} >
        <Icon name='add'/>
        </Button></Header>
  </Segment> 
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <Header>Table of Urinalysis</Header>
          <TableRow>
            <TableCell>Date Added</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Sodium (mEq/Dl)</TableCell>
            <TableCell align="right">Potassium (mEq/Dl)</TableCell>
            <TableCell align="right">Chloride (mEq/Dl)</TableCell>
            <TableCell align="right">HCO3 (mEq/Dl)</TableCell>
            <TableCell align="right">Creatinine (mEq/Dl)</TableCell>
            <TableCell align="right">Blood Urea Nitrogen (mg/Dl)</TableCell>
            <TableCell align="right">Fasting Glucose (mg/Dl)</TableCell>
            <TableCell align="right">Calcium (mg/Dl)</TableCell>
            <TableCell align="right">Magnesium (mEq/Dl)</TableCell>
            <TableCell align="right">Phosphate (mEq/Dl)</TableCell>

            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPatient?.urinalysisList.map(u => (
            <TableRow key={u.id}>
              <TableCell component="th" scope="row">
                {u.date}
              </TableCell>
              <TableCell align="right">{u.sodium}</TableCell>
              <TableCell align="right">{u.potassium}</TableCell>
              <TableCell align="right">{u.chloride}</TableCell>
              <TableCell align="right">{u.hcO3}</TableCell>
              <TableCell align="right">{u.creatinine}</TableCell>
              <TableCell align="right">{u.bloodUreaNitrogen}</TableCell>
              <TableCell align="right">{u.fastingGlucose}</TableCell>
              <TableCell align="right">{u.calcium}</TableCell>
              <TableCell align="right">{u.magnesium}</TableCell>
              <TableCell align="right">{u.phosphate}</TableCell>
              <TableCell align="right">
              <Card.Content extra>
            <Button.Group>
                <Button onClick={()=>{modalStore.openModal(<UrinalysisForm patientId={patientId} doctorId={doctorId} UrinalysisId={u.id}/>, 'small')}} color='black'>
                    Edit
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={u.id}
            loading={loading && target===u.id}
            onClick={(e)=>handleUrinalysisDelete(e, u.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
                </Button.Group>
            </Card.Content>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Segment>
    
</>
      

    )
})
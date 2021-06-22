import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import {Divider, Button, Header, Message} from "semantic-ui-react";

import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import CBCResults from './CBCResults';
import MetabolicPanelResults from './MetabolicPanelResults'
import LiverPanelResults from './LiverPanelResults'
import UrinalysisResults from './UrinalysisResults'
import { scroller } from "react-scroll";




export default observer( function LabResults() {



    const {patientStore, modalStore} = useStore();
    const {loadPatient, selectedPatient} = patientStore

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        loadPatient(id)
      }, [loadPatient])



    if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Lab Results...`}/>


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
 

    {(selectedPatient?.cbCs.length === 0 && selectedPatient.metabolicPanels.length ===0 && selectedPatient.liverPanels.length===0 && selectedPatient.urinalysisList.length ===0) ? (

      <Message negative>
    <Message.Header>{selectedPatient?.name}, your Doctor hasn't added your Laboratory Results yet.</Message.Header>
    <p>Make sure to contact your doctor</p>
  </Message>
    ) :(
      <>
      <Header sub>Your Laboratory Results</Header>
      <br/>
  <Button.Group fluid> 
          <Button size='large' color='blue' onClick={scrollToMetabolicPanel}>
                    Scroll to Metabolic Panel</Button>
           <Button.Or/>
            <Button size='large' color='blue' onClick={scrollToLiverPanel}>
                    Scroll to Liver Panel
            </Button>
            <Button.Or/>
            <Button size='large' color='blue' onClick={scrollToUrinalysis}>
                    Scroll to Urinalysis
            </Button>
                    
        </Button.Group>

        <CBCResults selectedPatient ={selectedPatient} />

        <Divider/>

        <Header className='metabolicPanel'>
        <MetabolicPanelResults selectedPatient ={selectedPatient} /></Header>

        <Divider/>


        <Header className='liverPanel'>
        <LiverPanelResults selectedPatient ={selectedPatient} /></Header>
        <Divider/>

        <Header className='urinalysis'>
        <UrinalysisResults selectedPatient ={selectedPatient} /></Header>
        </>
      )
      
      }
      </>
    )


})
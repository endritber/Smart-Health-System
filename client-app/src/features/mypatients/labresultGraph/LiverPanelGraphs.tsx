import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import {LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Line } from "recharts";
import { Divider, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer (function LiverPanelGraphs () {
    const { patientStore} = useStore();

  
    const {loadPatient, selectedPatient} = patientStore;

    // const {patientId} = useParams<{patientId: string}>();
    // useEffect(() => {
    //     loadPatient(patientId)
    //   }, [loadPatient])



    //  if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
    


   var data = [
    {
      "name":"",
      "TotalBiliRubin":parseInt(''),
      "DirectBiliRubin":parseInt(''),
      "SGOT":parseInt(''),
      "SGPT":parseInt(''),
      "AlkalinePhosPhatase":parseInt('')
    },
 
    
]
selectedPatient?.liverPanels.map(lp => (
    data.push({name:(lp.date), TotalBiliRubin:(lp.totalBiliRubin), DirectBiliRubin:(lp.directBiliRubin), SGOT:(lp.sgot), SGPT:(lp.sgpt), AlkalinePhosPhatase:(lp.alkalinePhosPhatase)})
)) ;
    

    return (

<>
<Header style={{font:20}}>Liver Panel Results for {selectedPatient?.name} {selectedPatient?.lastName}</Header>
<Segment>
<LineChart width={970} height={530} data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="linear" dataKey="TotalBiliRubin" stroke="#8884d8" />
  <Line type="linear" dataKey="DirectBiliRubin" stroke="#82ca9d" />
  <Line type="linear" dataKey="SGOT" stroke="#84c6d8" />
  <Line type="linear" dataKey="SGPT" stroke="#d7d884" />
  <Line type="linear" dataKey="AlkalinePhosPhatase" stroke="#c23636" />
</LineChart>
</Segment>
<Divider/>
</>

    )
})
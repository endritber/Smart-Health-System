import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Divider, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer (function LabResultGraph () {
    const { labResultStore, patientStore} = useStore();

    const {loading} = labResultStore;
    const {loadPatient, selectedPatient} = patientStore;

    const {patientId} = useParams<{patientId: string}>();
    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

    var data = [
        {
          "name":"",
          "Sample":"",
          "Result":"",
        }
      ]
      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
    
   {selectedPatient?.labResults.map(labresult=>(
       data.push({name:labresult.date, Sample:labresult.problemProportion, Result:labresult.resultProportion})
   ))}

    return (

<>
<Header style={{font:20}}>Laboratory Results from {selectedPatient?.name} {selectedPatient?.lastName}</Header>
<Segment>
 <LineChart width={1050} height={550} data={data}
  margin={{ top: 10, right: 40, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="2 2" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend verticalAlign="top" height={36} />
  <Line type="monotone" dataKey="Sample" stroke="#8884d8" />
  <Line type="monotone" dataKey="Result" stroke="#82ca9d" />
</LineChart>
</Segment>
<Divider/>

<Segment>
<Header>{selectedPatient?.name}'s samples: {selectedPatient?.labResults.map(labresult=>(
    <Segment>
    <Header>Date: {labresult.date} - Sample Name: {labresult.sample}</Header>
    </Segment>
))}</Header>
</Segment>
<Divider/>

<Segment>
<Header>{selectedPatient?.name}'s results: {selectedPatient?.labResults.map(labresult=>(
      <Segment>
      <Header>Date: {labresult.date} - Result Name: {labresult.result}</Header>
      </Segment>
))}</Header>
</Segment>
<Divider/>
</>
    )
})
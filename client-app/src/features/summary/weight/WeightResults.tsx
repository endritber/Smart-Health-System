import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis, Legend, Line, Area, Bar } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import WeightForm from './WeightForm';
import { observer } from 'mobx-react-lite';

export default observer( function WeightResults(){
    var data = [
        {
          "name": "",
          "Weight": parseInt('')
        },
   
      ]
      const {id} = useParams<{id: string}>();
      const{modalStore,weightStore,patientStore}=useStore()
      const {loadPatient,selectedPatient} = patientStore;
      useEffect(() => {
        loadPatient(id)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
      selectedPatient?.weight.map(w => (
        data.push({name: (w.date),Weight: (w.myWeight)})
    )) ;
   
    return (
        <>
        <Header sub>Weight</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' onClick={()=>{modalStore.openModal(<WeightForm id={id}/>,'large')}}  color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' color='twitter'></Button>
        </Button.Group>
        <Segment>
        <ComposedChart width={1050} height={500} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[85,120]}/>
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Weight" stroke="#ff7300" />
        </ComposedChart>
        </Segment>

        <br></br>
            
            </>
    )
}
)
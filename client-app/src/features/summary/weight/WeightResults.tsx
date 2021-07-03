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
import { DateTime } from 'luxon';
import WeightData from './WeightData';


export default observer( function WeightResults(){
    var data = [
        {
          "name": "",
          "Weight": parseInt('')
        },
   
      ]
      let dateTime = DateTime.now().toISO();
      var index = 0;
      const {id} = useParams<{id: string}>();
      const{modalStore,weightStore,patientStore}=useStore()
      const {loadPatient,selectedPatient} = patientStore;
      useEffect(() => {
        loadPatient(id)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
      selectedPatient?.weight.map(w => (
        (w.date.split('-')[1] === dateTime.toString().split('-')[1])?
        data.push({name: (w.date.split('T')[0]),Weight: (w.myWeight)}): index+=1
    )) ;

   
    return (
        <>
        <Header sub>Weight</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' onClick={()=>{modalStore.openModal(<WeightForm weightId = {""}  id={id}/>,'large')}}  color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data'  onClick={()=>{modalStore.openModal(<WeightData patientId = {id} />,'large')}} color='twitter'></Button>
        </Button.Group>
        <Header sub>Showing data only this month.</Header>
        <Segment>
        <ComposedChart width={1050} height={500} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[30,150]}/>
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
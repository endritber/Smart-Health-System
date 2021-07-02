import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis, Legend, Line, Area, Bar } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WaterIntakeForm from './WaterIntakeForm';

export default function WaterResults(){
    const data = [
        {
          "name": "",
          "Water": parseInt("")
        }
      ]

      const {id} = useParams<{id: string}>();
      const{modalStore,waterintakeStore,patientStore} = useStore()
      const {loadPatient, selectedPatient} = patientStore
      useEffect(() => {
        loadPatient(id)
      }, [loadPatient])



      selectedPatient?.waterintake.map(wi => (
        data.push({name: (wi.date), Water: wi.waterPerHour})
    )) ;



    
    return (
        <>
        <Header sub>Water Intake</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' onClick={()=>{modalStore.openModal(<WaterIntakeForm id = {id} />,'large')}}  color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' color='twitter'></Button>
        </Button.Group>
        <Segment>
        <ComposedChart width={1050} height={500} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0,10]}/>
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="Water(l)" barSize={50} fill="#add8e6" />
        </ComposedChart>
        </Segment>

        <br></br>
            
            </>
    )
}
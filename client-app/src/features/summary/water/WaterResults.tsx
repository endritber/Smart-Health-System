import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis, Legend, Line, Area, Bar } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WaterIntakeForm from './WaterIntakeForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { DateTime } from 'luxon';


export default observer( function WaterResults(){


  
    const data = [
        {
          "name": "",
          "Water": 0
        }
      ]

      let dateTime = DateTime.now().toISO();

      console.log(dateTime)

      var index =0;

      const {id} = useParams<{id: string}>();
      const{modalStore,patientStore} = useStore()
      const {loadPatient, selectedPatient} = patientStore
      useEffect(() => {
        loadPatient(id)
      }, [loadPatient])
      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>

      
    
      selectedPatient?.waterIntake.map(wi => (
        (wi.date.split('T')[0] === dateTime.toString().split('T')[0])?
        data.push({name: (wi.date.split('T')[1]), Water: wi.literPerHour}) : index +=1
    )) ;

    var sum = 0;

    data.forEach(Water=>{
      sum += Water.Water
    })

    data.sort()

        
    

    
    return (
        <>
        <Header sub>Today's Water Intake</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' onClick={()=>{modalStore.openModal(<WaterIntakeForm id = {id} />,'large')}}  color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' color='twitter'></Button>
        </Button.Group>
        <Header>Today you drank {sum} ml</Header>
        <Segment>
        <ComposedChart width={1050} height={500} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0,10]}/>
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="Water" barSize={50} fill="#add8e6" />
        </ComposedChart>
        </Segment>

        <br></br>
            
            </>
    )
})
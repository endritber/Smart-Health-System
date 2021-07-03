import { Header, Segment, Button} from 'semantic-ui-react';
import {LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Line } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeightForm from './HeightForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';

export default observer(function HeightResults(){
    const data = [
        {
          "name": "",
          "Height": parseInt('')
        }


      ]
      let dateTime = DateTime.now().toISO();
      var index = 0
      const {id} = useParams<{id: string}>();
      const{modalStore,heightStore,patientStore}=useStore()
      const {loadPatient,selectedPatient} = patientStore;
       useEffect(() => {
        loadPatient(id)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
      selectedPatient?.height.map(h => (
        (h.date.split('-')[0] === dateTime.toString().split('-')[0])?
        data.push({name: (h.date.split('T')[0]),Height: (h.myHeight)}):index+=1
    )) ;



   
    return (
        <>
        <Header sub>Height</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' onClick={()=>{modalStore.openModal(<HeightForm id={id}/>,'large')}} color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data'  color='twitter'></Button>
        </Button.Group>
        <Header sub>Showing data only this year.</Header>
        <Segment>
        <LineChart width={1050} height={500} data={data}
            margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0,3.2]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Height" stroke="#6a0dad" />
            </LineChart>
        </Segment>
        <br></br>
        
        </>
    )
})
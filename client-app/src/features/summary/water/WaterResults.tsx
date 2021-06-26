import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis, Legend, Line, Area, Bar } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';

export default function WaterResults(){
    const data = [
        {
          "name": "26.06.2021",
          "Water(l)": 4
        },
        {
            "name": "23.06.2022",
            "Water(l)": 5
        },
        {
            "name": "23.06.2022",
            "Water(l)": 3
        },
        {
            "name": "23.06.2022",
            "Water(l)": 6
        },
        {
            "name": "23.06.2022",
            "Water(l)": 4
        },
      ]


    const{modalStore}=useStore()
    return (
        <>
        <Header sub>Water Intake</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' onClick={()=>{modalStore.openModal(<CBCGraphs/>,'large')}} color='twitter'></Button>
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
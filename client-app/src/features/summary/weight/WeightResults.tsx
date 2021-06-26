import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis, Legend, Line, Area, Bar } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';

export default function WeightResults(){
    const data = [
        {
          "name": "26.06.2021",
          "Weight(kg)": 100
        },
        {
            "name": "23.06.2022",
            "Weight(kg)": 94
        },
        {
            "name": "23.06.2022",
            "Weight(kg)": 98
        },
        {
            "name": "23.06.2022",
            "Weight(kg)": 104
        },
        {
            "name": "23.06.2022",
            "Weight(kg)": 99
        },
      ]


    const{modalStore}=useStore()
    return (
        <>
        <Header sub>Weight</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' onClick={()=>{modalStore.openModal(<CBCGraphs/>,'large')}} color='twitter'></Button>
        </Button.Group>
        <Segment>
        <ComposedChart width={1050} height={500} data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[85,120]}/>
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="Weight(kg)" stroke="#ff7300" />
        </ComposedChart>
        </Segment>

        <br></br>
            
            </>
    )
}
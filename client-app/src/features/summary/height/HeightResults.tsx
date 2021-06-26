import { Header, Segment, Button} from 'semantic-ui-react';
import {LineChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Line } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';

export default function HeightResults(){
    const data = [
        {
          "name": "26.06.2021",
          "Height(m)": 1.88
        },
        {
            "name": "23.06.2022",
            "Height(m)": 1.99
        },
        {
            "name": "23.06.2022",
            "Height(m)": 2.01
        },
        {
            "name": "23.06.2022",
            "Height(m)": 2.10
        },
        {
            "name": "23.06.2022",
            "Height(m)": 2.12
        },
      ]
    const{modalStore}=useStore()
    return (
        <>
        <Header sub>Height</Header>
        <br></br>
        <Button.Group>
        <Button content='Add Data' color='teal' ></Button>
        <Button.Or/>
        <Button content='Show all data' onClick={()=>{modalStore.openModal(<CBCGraphs/>,'large')}} color='twitter'></Button>
        </Button.Group>
        <Segment>
        <LineChart width={1050} height={500} data={data}
            margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0,3.2]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Height(m)" stroke="#6a0dad" />
            </LineChart>
        </Segment>
        <br></br>
        
        </>
    )
}
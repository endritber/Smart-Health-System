import { Header, Segment, Button, SegmentProps} from 'semantic-ui-react';
import {LineChart, CartesianGrid, ComposedChart, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, Legend, Line, Area, Bar, Scatter } from "recharts";
import { useStore } from '../../../app/stores/store';
import CBCGraphs from '../../mypatients/labresultGraph/CBCGraphs';

export default function WaterResults(){
    const data01 = [
        {
          "x": 100,
          "y": 200,
          "z": 200
        },
        {
          "x": 120,
          "y": 100,
          "z": 260
        },
        {
          "x": 170,
          "y": 300,
          "z": 400
        },
        {
          "x": 140,
          "y": 250,
          "z": 280
        },
        {
          "x": 150,
          "y": 400,
          "z": 500
        },
        {
          "x": 110,
          "y": 280,
          "z": 200
        }
      ];
      const data02 = [
        {
          "x": 200,
          "y": 260,
          "z": 240
        },
        {
          "x": 240,
          "y": 290,
          "z": 220
        },
        {
          "x": 190,
          "y": 290,
          "z": 250
        },
        {
          "x": 198,
          "y": 250,
          "z": 210
        },
        {
          "x": 180,
          "y": 280,
          "z": 260
        },
        {
          "x": 210,
          "y": 220,
          "z": 230
        }
      ];
    const{modalStore}=useStore()
    return (
      <>
      <Header sub>Vitals</Header>
      <br></br>
      <Button.Group>
      <Button content='Add Data' color='teal' ></Button>
      <Button.Or/>
      <Button content='Show all data' onClick={()=>{modalStore.openModal(<CBCGraphs/>,'large')}} color='twitter'></Button>
      </Button.Group>
      <Segment>
          <ScatterChart width={730} height={250} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x"/>
          <YAxis dataKey="y"/>
          <ZAxis dataKey="z" range={[64, 144]}/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Blood Pressure" data={data01} fill="#8884d8" />
          <Scatter name="Pulse" data={data02} fill="#82ca9d" />
          </ScatterChart>
      </Segment>

      <br></br>
      </>
    )

}
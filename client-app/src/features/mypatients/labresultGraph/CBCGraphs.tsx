import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import {BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Bar } from "recharts";
import { Divider, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer (function CBCGraphs () {
    const { patientStore} = useStore();

  
    const {loadPatient, selectedPatient} = patientStore;


    var wbc = 0;
    var segmentedNeutrofilis =0;
    var bandForms =0;
    var lymphocytes =0;
    var monocytes=0;
    var basoghilis=0;
    var hemoglobin=0;
    var hematocrit=0;
    var  plateletCount=0;

    var cbcCount = 0
     if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Graph...`}/>
    
   {selectedPatient?.cbCs.map(cbc=>(


    
        wbc += cbc.wbc,
        segmentedNeutrofilis += cbc.segmentedNeutrofilis,
        bandForms += cbc.bandForms,
        lymphocytes += cbc.lymphocytes,
        monocytes += cbc.monocytes,
        basoghilis += cbc.basoghilis,
        hemoglobin += cbc.hemoglobin,
        hematocrit += cbc.hematocrit,
        plateletCount += cbc.plateletCount,

        cbcCount+=1
   ))}

   wbc = wbc/cbcCount;
    segmentedNeutrofilis =segmentedNeutrofilis/cbcCount;
    bandForms =bandForms/cbcCount;
    lymphocytes =lymphocytes/cbcCount;
    monocytes=monocytes/cbcCount;
    basoghilis=basoghilis/cbcCount;
    hemoglobin=hemoglobin/cbcCount;
    hematocrit=hematocrit/cbcCount;
    plateletCount=plateletCount/cbcCount;


   var data = [
    {
      "name":"WBC",
      "Value":wbc,
    },
    {
        "name":"Neutrofilis",
        "Value":segmentedNeutrofilis,
    },
    {
        "name":"Band Forms",
        "Value":bandForms,
    },
    {
        "name":"Lymphocytes",
        "Value":lymphocytes,
    },
    {
        "name":"Monocytes",
        "Value":monocytes,
    },
    {
        "name":"Basoghilis",
        "Value":basoghilis,
    },
    {
        "name":"Hemoglobin",
        "Value":hemoglobin,
    },
    {
        "name":"Hematocrit",
        "Value":hematocrit,
    },
    {
        "name":"Platelet Count",
        "Value":plateletCount,
    },
    

    
]
    

    return (

<>
<Header style={{font:20}}>(AVG) CBC Results for {selectedPatient?.name} {selectedPatient?.lastName}</Header>
<Segment>
<BarChart width={1000} height={500} data={data} barSize={50}>
  <CartesianGrid strokeDasharray="7 7" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="Value" fill="#3E57E1" />

</BarChart>
</Segment>
<Divider/>
</>

    )
})
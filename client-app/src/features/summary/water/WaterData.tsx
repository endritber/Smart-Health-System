import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Segment, Table } from "semantic-ui-react";
import modalStore from "../../../app/stores/modalStore";
import { useStore } from "../../../app/stores/store";
import HeightForm from "../height/HeightForm";
import WaterIntakeForm from "./WaterIntakeForm";


interface Props {
    patientId: string;
}


export default observer ( function WaterData ({patientId}: Props){

    const [target, setTarget] = useState('');

    const {patientStore,waterintakeStore,modalStore} = useStore();
    const {loadPatient,selectedPatient} = patientStore;
    const {deleteWaterIntake,loading} = waterintakeStore;
    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])
  
      var index = 0;
      function handleHeightDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteWaterIntake(id)
        window.location.reload()
    }
    return (
        <Segment>
            <Table celled striped>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='7'><h1>Water Intake Data</h1></Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='1'>No</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Water Intake (l/d)</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Date </Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Action </Table.HeaderCell>
        </Table.Row>
        </Table.Header>
            {selectedPatient?.waterIntake.map(s=>(
                <>
             <Table.Body>
             
            {(index+1 === selectedPatient.waterIntake.length)? (
                <>
                <Table.Row positive>
                <Table.Cell> 
                    {index+=1} 
                    </Table.Cell>
                    <Table.Cell> 
                        {s.literPerHour}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.waterintakeId}
                            name = {s.waterintakeId}
                            onClick={()=>{modalStore.openModal(<WaterIntakeForm waterintakeId = {s.waterintakeId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.waterintakeId}
                            name = {s.waterintakeId}
                            onClick={(e)=>handleHeightDelete(e,s.waterintakeId)}                             />
                        </Button.Group>
                    </Table.Cell>
                    </Table.Row>
                </>
            ):(

             
                <>
                <Table.Row>
                <Table.Cell> 
                        {index+=1}
                    </Table.Cell>
                    <Table.Cell> 
                        {s.literPerHour}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                    <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.waterintakeId}
                            name = {s.waterintakeId}
                            onClick={()=>{modalStore.openModal(<WaterIntakeForm waterintakeId = {s.waterintakeId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.waterintakeId}
                            name = {s.waterintakeId}
                            onClick={(e)=>handleHeightDelete(e,s.waterintakeId)}                             />
                        </Button.Group>
                    </Table.Cell>
                    
                    </Table.Row>
                    </>)}
                </Table.Body>
          
                </>
            ))}
            </Table>
        </Segment>
    )
}
)
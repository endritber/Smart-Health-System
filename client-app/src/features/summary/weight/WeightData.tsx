import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Segment, Table } from "semantic-ui-react";
import modalStore from "../../../app/stores/modalStore";
import { useStore } from "../../../app/stores/store";
import WeightForm from "./WeightForm";

interface Props {
    patientId: string;
}


export default observer ( function WeightData ({patientId}: Props){

    const [target, setTarget] = useState('');

    const {patientStore,weightStore,modalStore} = useStore();
    const {loadPatient,selectedPatient} = patientStore;
    const {deleteWeight,loading} = weightStore;
    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])
  
      var index = 0;
      function handleWeightDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteWeight(id)
        window.location.reload()
    }
    return (
        <Segment>
            <Table celled striped>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='7'><h1>Weight Data</h1></Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='1'>No</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Weight (Kg)</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Date </Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Action </Table.HeaderCell>
        </Table.Row>
        </Table.Header>
            {selectedPatient?.weight.map(s=>(
                <>
             <Table.Body>
             
            {(index+1 === selectedPatient.weight.length)? (
                <>
                <Table.Row positive>
                <Table.Cell> 
                    {index+=1} 
                    </Table.Cell>
                    <Table.Cell> 
                        {s.myWeight}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.weightId}
                            name = {s.weightId}
                            onClick={()=>{modalStore.openModal(<WeightForm weightId = {s.weightId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.weightId}
                            name = {s.weightId}
                            onClick={(e)=>handleWeightDelete(e,s.weightId)}                             />
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
                        {s.myWeight}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                    <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.weightId}
                            name = {s.weightId}
                            onClick={()=>{modalStore.openModal(<WeightForm weightId = {s.weightId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.weightId}
                            name = {s.weightId}
                            onClick={(e)=>handleWeightDelete(e,s.weightId)}                             />
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
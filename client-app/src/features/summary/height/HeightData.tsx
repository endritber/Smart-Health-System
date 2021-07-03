import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Segment, Table } from "semantic-ui-react";
import modalStore from "../../../app/stores/modalStore";
import { useStore } from "../../../app/stores/store";
import HeightForm from "./HeightForm";
import WeightForm from "./HeightForm";

interface Props {
    patientId: string;
}


export default observer ( function HeighttData ({patientId}: Props){

    const [target, setTarget] = useState('');

    const {patientStore,heightStore,modalStore} = useStore();
    const {loadPatient,selectedPatient} = patientStore;
    const {deleteHeight,loading} = heightStore;
    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])
  
      var index = 0;
      function handleHeightDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteHeight(id)
        window.location.reload()
    }
    return (
        <Segment>
            <Table celled striped>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='7'><h1>Height Data</h1></Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan='1'>No</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Height (M)</Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Date </Table.HeaderCell>
            <Table.HeaderCell colSpan='1'>Action </Table.HeaderCell>
        </Table.Row>
        </Table.Header>
            {selectedPatient?.height.map(s=>(
                <>
             <Table.Body>
             
            {(index+1 === selectedPatient.height.length)? (
                <>
                <Table.Row positive>
                <Table.Cell> 
                    {index+=1} 
                    </Table.Cell>
                    <Table.Cell> 
                        {s.myHeight}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.heightId}
                            name = {s.heightId}
                            onClick={()=>{modalStore.openModal(<HeightForm heightId = {s.heightId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.heightId}
                            name = {s.heightId}
                            onClick={(e)=>handleHeightDelete(e,s.heightId)}                             />
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
                        {s.myHeight}
                    </Table.Cell>
                    <Table.Cell>{s.date.split("T") [0]}</Table.Cell>
                    <Table.Cell>
                    <Button.Group>
                        <Button style={{width:' 100px'}} 
                            color='black'  content='Edit'
                            loading={loading && target === s.heightId}
                            name = {s.heightId}
                            onClick={()=>{modalStore.openModal(<HeightForm heightId = {s.heightId} id = {patientId} />,'large')}}                             />
                            <Button.Or/>

                        <Button style={{width:' 100px'}} 
                            color='red' type='submit' content='Delete'
                            loading={loading && target === s.heightId}
                            name = {s.heightId}
                            onClick={(e)=>handleHeightDelete(e,s.heightId)}                             />
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
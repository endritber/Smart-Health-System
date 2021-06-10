import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, Divider, Header, Icon, Image, Item, Modal, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";



export default observer (function LabResultsList() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, labResultStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deleteLabResult, loading} = labResultStore
    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Lab Results...`}/>

      

      function handleLabResultDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
            setTarget(e.currentTarget.name)
            deleteLabResult(id).then(()=> history.push(`/myPatients/${doctorId}`));
      }

    return (
        <Segment>   
          <Segment>
            <Header>
          <Header>Add {selectedPatient?.name}'s Laboratory Results</Header>
        <Button size ='huge' color='teal' as={Link} to={`/labResultForm/${patientId}/${doctorId}`}>
                Add Lab Result
        </Button></Header>
        <Header>
        <Header>View {selectedPatient?.name}'s Graph Laboratory Results</Header>
        <Button size='large' color='teal' as={Link} to={`/graph/${patientId}/${doctorId}`}>
                    View Graph
          </Button></Header></Segment> 
        {selectedPatient?.labResults.map(labresult=> (
            <Card  fluid>
            <Card.Content>
                <Card.Header>Sample: {labresult.sample}</Card.Header>
                <Divider/>
                <Card.Header>Proportion of Sample: <Card.Content>{labresult.problemProportion}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>
                Date Added: 
                <Card.Meta>
                {labresult.date}
                </Card.Meta>
                <Divider/>
                </Card.Header>

                <Card.Header>Lab Result: <Card.Content>{labresult.result}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Proportion of Result: <Card.Content>{labresult.resultProportion}
                
              
                </Card.Content></Card.Header>
                
                <Card.Description>Status: <Card.Content>{labresult.status}</Card.Content></Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group>
                <Button as={Link} to={`/manage/${patientId}/${doctorId}/${labresult.id}`} color='blue'>
                    Edit Lab Result
                    </Button>
                <Button.Or/>
                <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
        color='red'>
            Delete Lab Result
        </Button> }
        > <Modal.Header>Are you sure ?</Modal.Header>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No!
          </Button>
          <Button
            content="Yes!"
            name={labresult.id}
            loading={loading && target===labresult.id}
            onClick={(e)=>handleLabResultDelete(e, labresult.id) }
            color='red'
          />
        </Modal.Actions>
      </Modal>
            
                </Button.Group>
                
            </Card.Content>
            
            </Card>
           
            
        ))}
        <Divider/>
        </Segment>

    )
})
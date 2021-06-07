import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, Divider, Icon, Image, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";



export default observer (function LabResultsList() {

    const {patientStore, labResultStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {patientId} = useParams<{patientId: string}>();
    const {doctorId} = useParams<{doctorId: string}>();

    useEffect(() => {
        loadPatient(patientId)
        patientStore.loadPatients();
      }, [loadPatient, labResultStore])

      if (patientStore.loadingInitial) return <LoadingComponent content='Loading Lab Results...'/>

    return (
        <Segment>
            
        <Button size ='huge' color='teal' as={Link} to={`/labResultForm/${selectedPatient?.id}/${doctorId}`}>
                Add Lab Result for {selectedPatient?.name} {selectedPatient?.lastName}
        </Button>
        <br/>
        {selectedPatient?.labResults.map(labresult=> (
            <Card style={{display: 'inline-block'}} fluid>
            <Card.Content>
                <Card.Header>Sample: <Card.Content>{labresult.sample}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Proportion of Sample: <Card.Content>{labresult.problemProportion}</Card.Content></Card.Header>
                <Divider/>
                <Card.Meta>
                Date Added: {labresult.date}
                </Card.Meta>
                <Divider/>

                <Card.Header>Lab Result: <Card.Content>{labresult.result}</Card.Content></Card.Header>
                <Divider/>
                <Card.Header>Proportion of Result: <Card.Content>{labresult.resultProportion}</Card.Content></Card.Header>
                <Card.Description>Status: <Card.Content>{labresult.status}</Card.Content></Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group>
                <Button  color='blue'>
                    Edit Lab Result
                    </Button>
                <Button.Or/>
                <Button  color='red'>
                    Delete Lab Result
                </Button>
                </Button.Group>
                
            </Card.Content>
            
            </Card>
           
            
        ))}
        <Divider/>
        </Segment>

    )
})
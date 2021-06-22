import { Button, Card, Divider, Modal, Segment } from "semantic-ui-react";
import React, { SyntheticEvent, useState } from 'react';
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";


interface Props {
    id:string;
    patientId:string;
    doctorId:string;
}


export default function AllergyAction ({id, patientId, doctorId}:Props){

    const {allergyStore} = useStore();

    const {deleteAllergy, loading} = allergyStore;

    const [target, setTarget] = useState('');
    function handleAllergyDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteAllergy(id);
    }

    

    const [open, setOpen] = React.useState(false)
    return (
        <Card.Content extra>
        <Button.Group>
            <Button color='blue' as={Link} to={`/manageAllergy/${patientId}/${doctorId}/${id}`}>
                Edit
                </Button>
            <Button.Or/>
            <Modal
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
  open={open}
  trigger={<Button
    color='red'>
        Delete
    </Button> }
    > <Modal.Header>Are you sure ?</Modal.Header>
    <Modal.Actions>
      <Button color='black' onClick={() => setOpen(false)}>
        No!
      </Button>
      <Button
        content="Yes!"
        name={id}
        loading={loading && target===id}
        onClick={(e)=>handleAllergyDelete(e,id) }
        color='red'
      />
    </Modal.Actions>
  </Modal>
            </Button.Group>
        </Card.Content>
    )
}
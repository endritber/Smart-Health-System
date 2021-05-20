import { Table } from "semantic-ui-react";
import { Prescription } from "../../../app/models/prescription";

interface Props {
    prescriptions: Prescription[]
}

export default function PrescreptionList({prescriptions}: Props) {
    return (

        <Table celled size='large' fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Medication</Table.HeaderCell>
              <Table.HeaderCell>Dose</Table.HeaderCell>
              <Table.HeaderCell>Frequency</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Provider</Table.HeaderCell>
              <Table.HeaderCell>Prescribed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {prescriptions.map(prescription => (
              <Table.Body>
              <Table.Row>
                <Table.Cell>{prescription.medication}</Table.Cell>
                <Table.Cell>{prescription.dose}</Table.Cell>
                <Table.Cell>{prescription.frequency}</Table.Cell>
                <Table.Cell>{prescription.quantity}</Table.Cell>
                <Table.Cell>{prescription.provider}</Table.Cell>
                <Table.Cell>{prescription.prescribed}</Table.Cell>
              </Table.Row>
              </Table.Body>
          ))}
        </Table>
    )
}
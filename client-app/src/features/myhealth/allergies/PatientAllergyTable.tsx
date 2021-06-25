import { makeStyles, Table } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Divider, Message, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Patient } from "../../../app/models/patient";
import { useStore } from "../../../app/stores/store";
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'info' | 'causes' | 'treatments' | 'naturalRemedies' | 'commonFoodTriggers' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}
const columns : Column[] = [
  { id: 'info', label: 'Information', minWidth: 400 },
  { id: 'causes', label: 'Causes', minWidth: 300, format: (value: string) => value.toLocaleString(), },
  { id: 'treatments', label: 'Treatments', minWidth: 100, format: (value: string) => value.toLocaleString(), },
  {
    id: 'naturalRemedies',
    label: 'Natural Remedies',
    minWidth: 400,
    align: 'right',
    format: (value: string) => value.toLocaleString(),
  },
  {
    id: 'commonFoodTriggers',
    label: 'Common Food Triggers',
    minWidth: 400,
    align: 'right',
    format: (value: string) => value.toLocaleString(),

  },

  
];
interface Data {
  info:string;
  causes:string;
  treatments:string;
  naturalRemedies:string;
  commonFoodTriggers:string
}
function createData(info:string,
  causes:string,
  treatments:string,
  naturalRemedies:string,
  commonFoodTriggers:string,
  ):Data
  {

  return {info, causes, treatments,naturalRemedies,commonFoodTriggers};
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


export default observer (function PatientAllergyTable() {
    const [target, setTarget] = useState('');
    const [open, setOpen] = React.useState(false)
    const history = useHistory();

    const {patientStore, allergyStore} = useStore();

    const {loadPatient, selectedPatient} = patientStore
    const {deleteAllergy, loading} = allergyStore
    const {patientId} = useParams<{patientId: string}>();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
  
      const rows:Data[] = [];
  
      {selectedPatient?.allergies.map(a=>(
          rows.push(
              createData(a.info, a.causes,a.treatments,a.naturalRemedies, a.commonFoodTriggers
                )
          )
      ))}
    


    useEffect(() => {
        loadPatient(patientId)
      }, [loadPatient])

      if (patientStore.loadingInitial) return <LoadingComponent content={`Loading Allergies...`}/>

      
      var count= 0;



    return (
      
      <>


      {selectedPatient?.allergies.length===0 ? (
      <>
      <Message negative>
        <Message.Header>{selectedPatient?.name}, your doctor hasn't added any allergies yet.</Message.Header>
        <p>Make sure to contact your doctor!</p>
      </Message>
      </>

      ):(
        <>
      <Header sub>Your Allergies</Header> 
        <Segment>    
        <Divider/>
        <Paper className={classes.root} style={{borderRadius:'5px'}}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{backgroundColor:'#424242'}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key = {row.info}  >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );                    
                  })}
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

        
        </Segment>
  
       </>

       )}
       </>

    )
})
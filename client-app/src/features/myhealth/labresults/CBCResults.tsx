import { makeStyles, Table } from "@material-ui/core"
import { Button, Header, Segment} from "semantic-ui-react";
import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";


import LoadingComponent from "../../../app/layout/LoadingComponent";
import CBCGraphs from "../../mypatients/labresultGraph/CBCGraphs";
import { observer } from "mobx-react-lite";

import { Patient } from "../../../app/models/patient";

interface Column {
    id: 'date' | 'wbc' | 'segmentedNeutrofilis' | 'bandForms' | 'lymphocytes' |'monocytes' | 'basoghilis'| 'hemoglobin' | 'hematocrit' | 'plateletCount';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
const columns : Column[] = [
    { id: 'date', label: 'Date Added', minWidth: 170 },
    { id: 'wbc', label: 'Wbc', minWidth: 170, format: (value: number) => value.toLocaleString('en-US'), },
    { id: 'segmentedNeutrofilis', label: 'Segmented Neutrofilis', minWidth: 100, format: (value: number) => value.toLocaleString('en-US'), },
    {
      id: 'bandForms',
      label: 'Band Forms',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'lymphocytes',
      label: 'Lymphocytes',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),

    },
    {
      id: 'monocytes',
      label: 'Monocytes',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),

    },
    {
        id: 'basoghilis',
        label: 'Basoghilis',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),

      },
      {
        id: 'hemoglobin',
        label: 'Hemoglobin',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),

      },
      {
        id: 'hematocrit',
        label: 'Hematocrit',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),

      },
      {
        id: 'plateletCount',
        label: 'Platelet Count',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),

      }
    
  ];
  interface Data {
    date:string;
    wbc:number;
    segmentedNeutrofilis:number;
    bandForms:number;
    lymphocytes:number;
    monocytes:number;
    basoghilis:number;
    hemoglobin:number;
    hematocrit:number ;
    plateletCount:number;
  }
  function createData(date:string,wbc:number,segmentedNeutrofilis:number,bandForms:number, lymphocytes:number,
    monocytes:number,
    basoghilis:number,
    hemoglobin:number,
    hematocrit:number ,
    plateletCount:number):Data
    {

    return {date, wbc, segmentedNeutrofilis, bandForms, lymphocytes, monocytes, basoghilis, hemoglobin, hematocrit, plateletCount};
  }



const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  interface Props {
      selectedPatient: Patient | undefined;
  }

  export default observer (function CBCResults({selectedPatient}: Props) {


    const {modalStore} = useStore();

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
  
      {selectedPatient?.cbCs.map(c=>(
          rows.push(
              createData(c.date, c.wbc, c.segmentedNeutrofilis, c.bandForms, c.lymphocytes, c.monocytes, c.basoghilis, c.hemoglobin, c.hematocrit, c.plateletCount)
          )
      ))}

      return (
        <Segment>
         <Header>
           Here are your CBC Results
         </Header>
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
                <TableRow hover role="checkbox" tabIndex={-1} key = {row.date}  >
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
      <Header>
      <Button size='large' color='teal' onClick={()=>{modalStore.openModal(<CBCGraphs/>)}} floated='right' style={{marginRight:10}}>
                    View Graph
          </Button>
          </Header>
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
      )

  })
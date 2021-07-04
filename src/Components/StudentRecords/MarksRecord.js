import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const AttendanceRecord = ({ records }) => {

  const getType = (type) => {
    if (type === `quiz`) return `Quiz`;
    if (type === `midTerm`) return `Mid Term`;
    return `Final Exam`;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'></TableCell>
            <TableCell align='center'>Marks</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Subject Code</TableCell>
            <TableCell align="right">Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.SR.toString()}>
              <TableCell component="th" scope="row">
                {getType(record.type)}
              </TableCell>
              <TableCell align="right">{record.subjectCode}</TableCell>
              <TableCell align="right">{record.marks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceRecord;
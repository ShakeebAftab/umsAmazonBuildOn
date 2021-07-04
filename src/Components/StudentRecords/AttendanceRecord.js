import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const AttendanceRecord = ({ records }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'></TableCell>
            <TableCell align='center'>Attendance</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Subject Code</TableCell>
            <TableCell align="right">Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.SR.toString()}>
              <TableCell component="th" scope="row">
                {record.day}
              </TableCell>
              <TableCell align="right">{record.subjectCode}</TableCell>
              <TableCell align="right">{record.attendance === 1 ? `Present` : `Absent`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceRecord;
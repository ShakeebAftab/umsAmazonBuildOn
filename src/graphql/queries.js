/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttendance = /* GraphQL */ `
  query GetAttendance($SR: Int!) {
    getAttendance(SR: $SR) {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const listAttendances = /* GraphQL */ `
  query ListAttendances {
    listAttendances {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const getMarks = /* GraphQL */ `
  query GetMarks($SR: Int!) {
    getMarks(SR: $SR) {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const listMarkss = /* GraphQL */ `
  query ListMarkss {
    listMarkss {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const getSelectedSubject = /* GraphQL */ `
  query GetSelectedSubject($SR: Int!) {
    getSelectedSubject(SR: $SR) {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const listSelectedSubjects = /* GraphQL */ `
  query ListSelectedSubjects {
    listSelectedSubjects {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const getStudents = /* GraphQL */ `
  query GetStudents($rollNum: Int!) {
    getStudents(rollNum: $rollNum) {
      rollNum
      name
      email
    }
  }
`;
export const listStudentss = /* GraphQL */ `
  query ListStudentss {
    listStudentss {
      rollNum
      name
      email
    }
  }
`;
export const getSubjects = /* GraphQL */ `
  query GetSubjects($code: Int!) {
    getSubjects(code: $code) {
      code
      name
    }
  }
`;
export const listSubjectss = /* GraphQL */ `
  query ListSubjectss {
    listSubjectss {
      code
      name
    }
  }
`;

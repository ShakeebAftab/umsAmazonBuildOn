/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($rollNum: Int!) {
    getStudent(rollNum: $rollNum) {
      rollNum
      name
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents {
    listStudents {
      rollNum
      name
    }
  }
`;
export const getSubject = /* GraphQL */ `
  query GetSubject($subCode: Int!) {
    getSubject(subCode: $subCode) {
      subCode
      name
      rollNum
    }
  }
`;
export const listSubjects = /* GraphQL */ `
  query ListSubjects {
    listSubjects {
      subCode
      name
      rollNum
    }
  }
`;

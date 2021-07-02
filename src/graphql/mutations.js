/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent($rollNum: Int!) {
    deleteStudent(rollNum: $rollNum) {
      rollNum
      name
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent($createStudentInput: CreateStudentInput!) {
    createStudent(createStudentInput: $createStudentInput) {
      rollNum
      name
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $updateStudentInput) {
      rollNum
      name
    }
  }
`;
export const deleteSubject = /* GraphQL */ `
  mutation DeleteSubject($subCode: Int!) {
    deleteSubject(subCode: $subCode) {
      subCode
      name
      rollNum
    }
  }
`;
export const createSubject = /* GraphQL */ `
  mutation CreateSubject($createSubjectInput: CreateSubjectInput!) {
    createSubject(createSubjectInput: $createSubjectInput) {
      subCode
      name
      rollNum
    }
  }
`;
export const updateSubject = /* GraphQL */ `
  mutation UpdateSubject($updateSubjectInput: UpdateSubjectInput!) {
    updateSubject(updateSubjectInput: $updateSubjectInput) {
      subCode
      name
      rollNum
    }
  }
`;

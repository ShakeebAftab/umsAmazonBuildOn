/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteAttendance = /* GraphQL */ `
  mutation DeleteAttendance($SR: Int!) {
    deleteAttendance(SR: $SR) {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const createAttendance = /* GraphQL */ `
  mutation CreateAttendance($createAttendanceInput: CreateAttendanceInput!) {
    createAttendance(createAttendanceInput: $createAttendanceInput) {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance($updateAttendanceInput: UpdateAttendanceInput!) {
    updateAttendance(updateAttendanceInput: $updateAttendanceInput) {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const deleteMarks = /* GraphQL */ `
  mutation DeleteMarks($SR: Int!) {
    deleteMarks(SR: $SR) {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const createMarks = /* GraphQL */ `
  mutation CreateMarks($createMarksInput: CreateMarksInput!) {
    createMarks(createMarksInput: $createMarksInput) {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const updateMarks = /* GraphQL */ `
  mutation UpdateMarks($updateMarksInput: UpdateMarksInput!) {
    updateMarks(updateMarksInput: $updateMarksInput) {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const deleteSelectedSubject = /* GraphQL */ `
  mutation DeleteSelectedSubject($SR: Int!) {
    deleteSelectedSubject(SR: $SR) {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const createSelectedSubject = /* GraphQL */ `
  mutation CreateSelectedSubject(
    $createSelectedSubjectInput: CreateSelectedSubjectInput!
  ) {
    createSelectedSubject(
      createSelectedSubjectInput: $createSelectedSubjectInput
    ) {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const updateSelectedSubject = /* GraphQL */ `
  mutation UpdateSelectedSubject(
    $updateSelectedSubjectInput: UpdateSelectedSubjectInput!
  ) {
    updateSelectedSubject(
      updateSelectedSubjectInput: $updateSelectedSubjectInput
    ) {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const deleteStudents = /* GraphQL */ `
  mutation DeleteStudents($rollNum: Int!) {
    deleteStudents(rollNum: $rollNum) {
      rollNum
      name
      email
    }
  }
`;
export const createStudents = /* GraphQL */ `
  mutation CreateStudents($createStudentsInput: CreateStudentsInput!) {
    createStudents(createStudentsInput: $createStudentsInput) {
      rollNum
      name
      email
    }
  }
`;
export const updateStudents = /* GraphQL */ `
  mutation UpdateStudents($updateStudentsInput: UpdateStudentsInput!) {
    updateStudents(updateStudentsInput: $updateStudentsInput) {
      rollNum
      name
      email
    }
  }
`;
export const deleteSubjects = /* GraphQL */ `
  mutation DeleteSubjects($code: Int!) {
    deleteSubjects(code: $code) {
      code
      name
    }
  }
`;
export const createSubjects = /* GraphQL */ `
  mutation CreateSubjects($createSubjectsInput: CreateSubjectsInput!) {
    createSubjects(createSubjectsInput: $createSubjectsInput) {
      code
      name
    }
  }
`;
export const updateSubjects = /* GraphQL */ `
  mutation UpdateSubjects($updateSubjectsInput: UpdateSubjectsInput!) {
    updateSubjects(updateSubjectsInput: $updateSubjectsInput) {
      code
      name
    }
  }
`;

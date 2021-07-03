/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttendance = /* GraphQL */ `
  subscription OnCreateAttendance {
    onCreateAttendance {
      SR
      day
      subjectCode
      studentRoll
      attendance
    }
  }
`;
export const onCreateMarks = /* GraphQL */ `
  subscription OnCreateMarks {
    onCreateMarks {
      SR
      type
      subjectCode
      studentRoll
      marks
    }
  }
`;
export const onCreateSelectedSubject = /* GraphQL */ `
  subscription OnCreateSelectedSubject {
    onCreateSelectedSubject {
      SR
      studentRoll
      subjectCode
    }
  }
`;
export const onCreateStudents = /* GraphQL */ `
  subscription OnCreateStudents {
    onCreateStudents {
      rollNum
      name
      email
    }
  }
`;
export const onCreateSubjects = /* GraphQL */ `
  subscription OnCreateSubjects {
    onCreateSubjects {
      code
      name
    }
  }
`;

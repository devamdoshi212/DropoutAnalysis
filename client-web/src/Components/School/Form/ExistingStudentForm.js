import React, { useState } from 'react';

const studentsData = [
  { uid: '1001', aadharNumber: '123456789012', name: 'HK', class: '10th' },
  { uid: '1002', aadharNumber: '987654321098', name: 'Devam', class: '9th' },
];

const ExistingStudentForm = () => {
  const [uidInput, setUidInput] = useState('');
  const [aadharInput, setAadharInput] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const findStudentByUid = () => {
    const student = studentsData.find((student) => student.uid === uidInput);
    setSelectedStudent(student);
  };

  const findStudentByAadhar = () => {
    const student = studentsData.find((student) => student.aadharNumber === aadharInput);
    setSelectedStudent(student);
  };

  const addStudentToSchool = () => {
    if (selectedStudent) {
      console.log(`Added student ${selectedStudent.name} to the school.`);
    } else {
      console.log('No student selected.');
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 border rounded bg-white shadow-md" style={{width: "50%"}}>
      <h2 className="text-xl font-bold mb-4">Add Existing Student to School</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uidInput">
          Student UID Number
        </label>
        <input
          type="text"
          id="uidInput"
          className="border-2"
          style={{ width: "100%" }}
          value={uidInput}
          onChange={(e) => setUidInput(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadharInput">
          Aadhar Number
        </label>
        <input
          type="text"
          id="aadharInput"
          className="border-2"
          style={{ width: "100%" }}
          value={aadharInput}
          onChange={(e) => setAadharInput(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={findStudentByUid}
        >
          Find by UID
        </button>
        <button
          type="button"
          className="btn bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={findStudentByAadhar}
        >
          Find by Aadhar
        </button>
      </div>

      {selectedStudent && (
        <div>
          <p className="text-green-500 font-bold">
            Student Found: {selectedStudent.name}, Class: {selectedStudent.class}
          </p>
          <button
            type="button"
            className="btn bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={addStudentToSchool}
          >
            Add to School
          </button>
        </div>
      )}
    </div>
  );
};

export default ExistingStudentForm;

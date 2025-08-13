

import React, { useState, useEffect } from 'react';
import { dummyStudentEnrolled } from '../../src/assets/assets';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {
  const [students, setStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return students ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pb-0 pt-8">
      <div className="space-y-5">
        <p className="text-gray-600 font-medium text-xl md:text-2xl">Latest Enrolments</p>
        <table className="table-fixed md:table-auto w-full overflow-hidden">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center sm:table-cell hidden">#</th>
              <th className="px-4 py-3 font-semibold">Student name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {students.map((enrolment, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center sm:table-cell hidden">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={enrolment.student.imageUrl}
                    alt={enrolment.student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="truncate">{enrolment.student.name}</span>
                </td>
                <td className="px-4 py-3">{enrolment.courseTitle}</td>
                <td className="px-4 py-3">
                  {new Date(enrolment.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;


"use client";

import { useGetAllSemestersQuery } from '@/redux/features/academicSemester/academicSemesterApi';
import React from 'react';

const AcademicSemester = () => {
  const { data:data, isLoading, isError } = useGetAllSemestersQuery();

  console.log('data', data);

  if (isLoading) {
    return <div className="text-center py-10">Loading semesters...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-10">Failed to load semesters.</div>;
  }

  // Extract semesters array safely
  const semesters = data?.data || [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Academic Semesters</h2>

      {semesters.length > 0 ? (
        <ul className="space-y-4">
          {semesters.map((semester: any) => (
            <li
              key={semester.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <p><strong>Name:</strong> {semester.name}</p>
              <p><strong>Start Date:</strong> {semester.startDate}</p>
              <p><strong>End Date:</strong> {semester.endDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">No semesters available.</div>
      )}
    </div>
  );
};

export default AcademicSemester;

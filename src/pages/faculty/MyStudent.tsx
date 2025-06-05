"use client"

import PHForm from '@/app/components/form/From';
import PHInput from '@/app/components/form/FInput';
import { Button, Modal, Table } from 'antd';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useAddMarkMutation, useGetAllFacultyCoursesQuery } from '@/redux/features/faculty/facultyCourses.api';

interface StudentInfo {
  key: string;
  name: string;
  roll: string;
  semesterRegistration: string;
  student: string;
  offeredCourse: string;
}


const AddMarksModal = ({ studentInfo }: { studentInfo: StudentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data: any) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    await addMark(studentMark);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title="Add Marks"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

const MyStudents = ({params}) => {
    
  // const params = useParams();
  const registerSemesterId = params.registerSemesterId as string;
  const courseId = params.courseId as string;

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Roll',
      key: 'roll',
      dataIndex: 'roll',
    },
    {
      title: 'Action',
      key: 'x',
      render: (_: any, record: StudentInfo) => {
        return (
          <div>
            <AddMarksModal studentInfo={record} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} rowKey="key" />;
};

export default MyStudents;
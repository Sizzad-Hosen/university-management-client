"use client"

import PHForm from '@/app/components/form/From';
import FSelect from '@/app/components/form/FSelect';
import { useGetAllFacultyCoursesQuery } from '@/redux/features/faculty/facultyCourses.api';
import { Button, Col, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const MyCourses = () => {
    
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const router = useRouter();

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester?.name} ${item.academicSemester?.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <FSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <FSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
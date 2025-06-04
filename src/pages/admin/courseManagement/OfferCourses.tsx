"use client"

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import FSelect from '@/app/components/form/FSelect';
import FSelectWithWatch from '@/app/components/form/FSelectPropsWithWatch';
import FTimePicker from '@/app/components/form/FTimePicker';
import { weekDaysOptions } from '@/constant/global';
import { useGetAllDepartmentQuery, useGetAllFacultyQuery } from '@/redux/features/admin/academicManagement.api';
import { useAddOfferCourseMutation, useGetAllCoursesQuery, useGetAllRegisteredSemesterQuery, useGetCourseFacultyQuery } from '@/redux/features/admin/courseManagement.api';
import { Button, Col, Flex } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';


const OfferCourse = () => {

  const [courseId, setCourseId] = useState('');

  const [addOfferedCourse] = useAddOfferCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemesterQuery([
    { name: 'sort', value: 'year' },
    { name: 'status', value: 'UPCOMING' },

  ]);

  console.log('semester data',semesterRegistrationData)

  const { data: academicFacultyData } = useGetAllFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =

    useGetCourseFacultyQuery(courseId, { skip: !courseId });

 console.log('courseeID',courseId)

    console.log('courseFaculty data', facultiesData);


  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(

    (item) => ({

      value: item._id,

      label: `${item.academicSemester.name} ${item.academicSemester.year}`,

    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));



  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

 const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  // Ensure `days` is an array
  const daysArray = Array.isArray(data.days)
    ? data.days
    : typeof data.days === 'string'
    ? data.days.split(',').map(day => day.trim())
    : [];

  const offeredCourseData = {
    ...data,
    days: daysArray, // ✅ updated
    maxCapacity: Number(data.maxCapacity),
    section: Number(data.section),
    startTime: moment(new Date(data.startTime)).format('HH:mm'),
    endTime: moment(new Date(data.endTime)).format('HH:mm'),
  };

  const res = await addOfferedCourse(offeredCourseData);

  console.log(res);
};

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <FSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <FSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <FSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />

          <FSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />

          <FSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <FSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <FTimePicker name="startTime" label="Start Time" />
          <FTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
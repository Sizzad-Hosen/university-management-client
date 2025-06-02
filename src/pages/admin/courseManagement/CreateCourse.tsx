"use client"
import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import FSelect from '@/app/components/form/FSelect';
import { useAddCoursesMutation, useGetAllCoursesQuery } from '@/redux/features/admin/courseManagement.api';
import { Button, Col, Flex } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type TPreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};

type TCourseData = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
};

const CreateCourse = () => {

  const [createCourse, { isLoading }] = useAddCoursesMutation();
  const { data: courses, isLoading: isCoursesLoading } = useGetAllCoursesQuery(undefined);

  console.log('courses',courses);

  console.log('create courses',[createCourse]);


  const preRequisiteCoursesOptions = courses?.data?.map((course) => ({
    value: course._id,
    label: course.title,
  })) || [];

  
const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  const toastId = toast.loading('Creating course...');

  // Ensure preRequisiteCourses is always an array
  const preRequisites = Array.isArray(data.preRequisiteCourses) 
    ? data.preRequisiteCourses 
    : [];

  const courseData: TCourseData = {
    title: data.title,
    prefix: data.prefix,
    code: Number(data.code),
    credits: Number(data.credits),
    isDeleted: false,
    preRequisiteCourses: preRequisites.map((courseId: string) => ({
      course: courseId,
      isDeleted: false,
    })),
  };

    try {
      const res = await createCourse(courseData).unwrap();
      toast.success('Course created successfully!', { id: toastId });
      console.log('Course created:', res);
    } catch (error: any) {
      console.error('Error creating course:', error);
      toast.error(
        error.data?.message || 'Failed to create course',
        { id: toastId }
      );
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput 
            type="text" 
            name="title" 
            label="Title" 
          
          />
          <PHInput 
            type="text" 
            name="prefix" 
            label="Prefix" 
          
          />
          <PHInput 
            type="number" 
            name="code" 
            label="Code" 
          
          />
          <PHInput 
            type="number" 
            name="credits" 
            label="Credits" 
          
          />
          <FSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="Prerequisite Courses"
            loading={isCoursesLoading}
            disabled={isCoursesLoading}
          />
          <Button 
            htmlType="submit" 
            type="primary" 
            loading={isLoading}
            block
          >
            Create Course
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
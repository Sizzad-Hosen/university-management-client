'use client';

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { Button, message } from 'antd';
import FSelect from '@/app/components/form/FSelect';
import { useGetAllFacultyQuery } from '@/redux/features/admin/academicManagement.api';
import { IFaculty } from '@/types/global';


const CreateAcademicDepartment = () => {
  // Fetch all faculties
  const { data: facultyData, isLoading } = useGetAllFacultyQuery();
  
  // Prepare faculty options for select
  const facultyOptions = facultyData?.data?.map((faculty: IFaculty) => ({
    value: faculty._id,
    label: faculty.name,
  })) || [];

  const onSubmit = async (data: any) => {
    console.log('Form data to submit:', data);
    
    try {
      // Here you would typically make an API call to create the department
      // Example:
      // const res = await createAcademicDepartment(data).unwrap();
      // console.log('Department created:', res);
      
      message.success('Academic department created successfully!');
    } catch (error) {
      console.error('Error creating department:', error);
      message.error('Failed to create academic department');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Create Academic Department</h1>
      <PHForm onSubmit={onSubmit}>
        <PHInput 
          type="text" 
          name="name" 
          label="Department Name" 
        />
        
        <FSelect
          options={facultyOptions}
          name="academicFaculty"  // Changed to match backend expectation
          label="Academic Faculty"
          loading={isLoading}
          placeholder="Select Faculty"
        />
        
        <Button 
          type="primary" 
          htmlType="submit"
          style={{ marginTop: '16px' }}
        >
          Create Department
        </Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicDepartment;
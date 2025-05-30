'use client';

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { Button, message } from 'antd';
import FSelect from '@/app/components/form/FSelect';
import { useAddAcademicDepartmentMutation, useGetAllFacultyQuery } from '@/redux/features/admin/academicManagement.api';
import { IFaculty } from '@/types/global';
import { toast } from 'sonner';



const CreateAcademicDepartment = () => {
  // Fetch all faculties
  const { data: facultyData, isLoading } = useGetAllFacultyQuery();

  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  // Prepare faculty options for select
  const facultyOptions = facultyData?.data?.map((faculty: IFaculty) => ({
    value: faculty._id,
    label: faculty.name,
  })) || [];

 const onSubmit = async (data: any) => {
  console.log('Form data to submit:', data);

  const departmentData = {
    name: data.name,
    academicFaculty: data.academicFaculty // This should come from your form
  }
  
  try {
    const result = await addAcademicDepartment(departmentData);

    if (result.data?.success) {
      message.success('Academic department created successfully!');
      toast.success('Academic department created successfully!');
    } else {
      message.error(result.data?.message || 'Failed to create department');
      toast.error(result.data?.message || 'Failed to create department');
    }

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
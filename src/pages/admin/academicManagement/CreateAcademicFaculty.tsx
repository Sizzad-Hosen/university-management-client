"use client";
import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { useAddAcademicFacultyMutation } from '@/redux/features/admin/academicManagement.api';
import { Button } from 'antd';
import { toast } from 'sonner';

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { isLoading }] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: { name: string }) => {
    const toastId = toast.loading('Creating academic faculty...');
    
    try {
      const facultyData = {
        name: data.name
      };

      const result = await addAcademicFaculty(facultyData);
      
      if ('data' in result && result.data?.success) {
        toast.success('Academic faculty created successfully!', {
          id: toastId
        });
      } else {
        throw new Error('Failed to create faculty');
      }
    } catch (error: any) {
      console.error('Error creating faculty:', error);
      toast.error(
        error?.data?.message || 'Failed to create academic faculty', 
        { id: toastId }
      );
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Create Academic Faculty</h1>
      <PHForm onSubmit={onSubmit}>  
        <PHInput
          type="text" 
          name="name" 
          label="Faculty Name"
          required
        />
        
        <Button 
          type="primary" 
          htmlType="submit"
          style={{ marginTop: '16px' }}
          loading={isLoading}
          disabled={isLoading}
        >
          Create Faculty
        </Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicFaculty;
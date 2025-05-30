'use client'; // Add this if using Next.js App Router

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import React from 'react';
import { Button, message } from 'antd';
import FSelect from '@/app/components/form/FSelect';

const CreateAcademicDepartment = () => {
  
  const onSubmit = (data: any) => {
    console.log(data);
  
    
    message.success('Academic department created successfully!');
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
        
        {/* Add more fields as needed */}
                  <FSelect
                options={facultyOptions}
                name="bloogGroup"
                label="Blood group"
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
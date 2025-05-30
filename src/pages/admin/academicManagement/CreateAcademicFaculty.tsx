"use client";

import PHInput from '@/app/components/form/FInput';
import PHForm from '@/app/components/form/From';
import { Button, message } from 'antd';
import React from 'react';

const CreateAcademicFaculty = () => {
  const onSubmit = (data: any) => {
    console.log(data);
    message.success('Academic faculty created successfully!');
  };

  return (
    
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Create Academic Faculty</h1>
      <PHForm onSubmit={onSubmit}>  
        <PHInput
          type="text" 
          name="name" 
          label="Faculty Name"  
        />
        
        <Button 
          type="primary" 
          htmlType="submit"
          style={{ marginTop: '16px' }}
        >
          Create Faculty
        </Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicFaculty;
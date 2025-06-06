'use client'

import FDatePicker from "@/app/components/form/FDatePicker";
import PHInput from "@/app/components/form/FInput";
import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { bloodGroupOptions, genderOptions } from "@/constant/global";

import { useGetAllDepartmentQuery, useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "@/redux/features/admin/usermanagement.api";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const studentDummyData = {

  password: 'student123',
  student: {
    name: {
      firstName: 'I am ',
      middleName: 'Student',
      lastName: 'Number 1',
    },
    gender: 'male',
    dateOfBirth: '1990-01-01',
    bloogGroup: 'A+',

    email: 'student3@gmail.com',
    contactNo: '1235678',
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',

    guardian: {
      fatherName: 'James Doe',
      fatherOccupation: 'Engineer',
      fatherContactNo: '111-222-3333',
      motherName: 'Mary Doe',
      motherOccupation: 'Teacher',
      motherContactNo: '444-555-6666',
    },

    localGuardian: {
      name: 'Alice Johnson',
      occupation: 'Doctor',
      contactNo: '777-888-9999',
      address: '789 Pine St, Villageton',
    },

    admissionSemester: '65bb60ebf71fdd1add63b1c0',
    academicDepartment: '65b4acae3dc8d4f3ad83e416',
  },
};

//! This is only for development
//! Should be removed
const studentDefaultValues = {
  name: {
    firstName: 'I am ',
    middleName: 'Student',
    lastName: 'Number 1',
  },
  gender: 'male',

  bloogGroup: 'A+',

  contactNo: '1235678',
  emergencyContactNo: '987-654-3210',
  presentAddress: '123 Main St, Cityville',
  permanentAddress: '456 Oak St, Townsville',

  guardian: {
    fatherName: 'James Doe',
    fatherOccupation: 'Engineer',
    fatherContactNo: '111-222-3333',
    motherName: 'Mary Doe',
    motherOccupation: 'Teacher',
    motherContactNo: '444-555-6666',
  },

  localGuardian: {
    name: 'Alice Johnson',
    occupation: 'Doctor',
    contactNo: '777-888-9999',
    address: '789 Pine St, Villageton',
  },

  admissionSemester: '65bb60ebf71fdd1add63b1c0',
  academicDepartment: '65b4acae3dc8d4f3ad83e416',
};

const CreateStudent = () => {
  const [addStudent, { data, error }] =  useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery();

  const { data: dData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery();

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  const toastId = toast.loading("Creating student...");
  
  try {
    // Format date to YYYY-MM-DD
    const formattedDateOfBirth = data.dateOfBirth 
      ? dayjs(data.dateOfBirth).format('YYYY-MM-DD') 
      : undefined;

    const studentData = {
      password: '123456',
      student: {
        ...data,
        dateOfBirth: formattedDateOfBirth, // Use formatted date
      },
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(studentData));
    
    if (data.image) {
      formData.append('file', data.image);
    }

    const response = await addStudent(formData).unwrap();
    
    if (response.success) {
      toast.success("Student created successfully!", { id: toastId });
    } else {
      throw new Error(response.message || "Failed to create student");
    }
  } catch (error: any) {
    console.error("Error creating student:", error);
    toast.error(
      error?.data?.message || 
      error.message || 
      "Failed to create student", 
      { id: toastId }
    );
  }
};

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
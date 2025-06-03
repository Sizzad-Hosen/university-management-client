'use client'

import FDatePicker from "@/app/components/form/FDatePicker";
import PHInput from "@/app/components/form/FInput";
import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { bloodGroupOptions, designationOptions, genderOptions } from "@/constant/global";
import { useGetAllDepartmentQuery } from "@/redux/features/admin/academicManagement.api";

import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

import { toast } from "sonner";

// const studentDummyData = {

//   password: 'student123',
//   student: {
//     name: {
//       firstName: 'I am ',
//       middleName: 'Student',
//       lastName: 'Number 1',
//     },
//     gender: 'male',
//     dateOfBirth: '1990-01-01',
//     bloogGroup: 'A+',

//     email: 'student3@gmail.com',
//     contactNo: '1235678',
//     emergencyContactNo: '987-654-3210',
//     presentAddress: '123 Main St, Cityville',
//     permanentAddress: '456 Oak St, Townsville',

//     guardian: {
//       fatherName: 'James Doe',
//       fatherOccupation: 'Engineer',
//       fatherContactNo: '111-222-3333',
//       motherName: 'Mary Doe',
//       motherOccupation: 'Teacher',
//       motherContactNo: '444-555-6666',
//     },

//     localGuardian: {
//       name: 'Alice Johnson',
//       occupation: 'Doctor',
//       contactNo: '777-888-9999',
//       address: '789 Pine St, Villageton',
//     },

//     admissionSemester: '65bb60ebf71fdd1add63b1c0',
//     academicDepartment: '65b4acae3dc8d4f3ad83e416',
//   },
// };



export const facultyDummyData = 
  {
    password:"123456",
    faculty:{
    designation: "Lecturer",
    name: {
    firstName: "Emily",
    middleName: "Rose",
    lastName: "Clark"
  },

  gender: "female",
  dateOfBirth: "1990-11-25T00:00:00.000Z",
  email: "emily.clark550@university.edu",
  contactNo: "+19876543210",
  emergencyContactNo: "+11234567890",
  bloogGroup: "B-",
  presentAddress: "789 Academic Ave, Knowledge City",
  permanentAddress: "321 Countryside Lane, Smalltown",
  profileImg: "https://example.com/images/emily-clark.jpg",
  academicDepartment: "67de7890540f89e762033db7",
  isDeleted: false
  
    }
  
 
}


const CreateFaculty = () => {

  const { data: dData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery();

  const departmentOptions = dData?.data?.map((item: { _id: any; name: any; }) => ({
    value: item._id,
    label: item.name,
  }));


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {



  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDummyData}>
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
              <FSelect
                options={designationOptions}
                name="designation"
                label="Designation"
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

          
          <Divider>Academic Info.</Divider>

          <Row gutter={8}>
        
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>

  );
};

export default CreateFaculty;
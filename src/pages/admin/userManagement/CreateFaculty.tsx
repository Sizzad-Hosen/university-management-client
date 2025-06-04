'use client'
import dayjs from 'dayjs'; // Import dayjs properly
import FDatePicker from "@/app/components/form/FDatePicker";
import PHInput from "@/app/components/form/FInput";
import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { bloodGroupOptions, designationOptions, genderOptions } from "@/constant/global";
import { useGetAllDepartmentQuery } from "@/redux/features/admin/academicManagement.api";
import { useAddFacultiesMutation, useAddFacultyMutation } from "@/redux/features/admin/usermanagement.api";

import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const facultyDummyData = {
  designation: "Lecturer",
  name: {
    firstName: "Emily",
    middleName: "Rose",
    lastName: "Clark"
  },
  gender: "female",
  dateOfBirth: dayjs("1990-01-01"), // Use dayjs to create date object
  email: "emily.clark550@university.edu",
  contactNo: "+19876543210",
  emergencyContactNo: "+11234567890",
  bloogGroup: "B-",
  presentAddress: "789 Academic Ave, Knowledge City",
  permanentAddress: "321 Countryside Lane, Smalltown",
  academicDepartment: "67de7890540f89e762033db7"
};

const CreateFaculty = () => {
  const { data: dData, isLoading: dIsLoading } = useGetAllDepartmentQuery();
  const [addFaculty] = useAddFacultiesMutation();
  

  const departmentOptions = dData?.data?.map((item: { _id: string; name: string }) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating faculty...");
    
    try {

    const facultyData = {
      
      password: '123456', // Default password or could be generated
      faculty: {
        designation: data.designation,
        name: {
          firstName: data.name.firstName,
          middleName: data.name.middleName,
          lastName: data.name.lastName
        },
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : null,
        email: data.email,
        contactNo: data.contactNo,
        emergencyContactNo: data.emergencyContactNo,
        bloogGroup: data.bloogGroup,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        academicDepartment: data.academicDepartment,
        profileImg: data.image ? data.image.name : undefined
      }
    };
      const formData = new FormData();
      formData.append('data', JSON.stringify(facultyData));
      
      if (data.image) {
        formData.append('file', data.image);
      }

      const res = await addFaculty(formData).unwrap();
  
      if (res.success) {
        toast.success("Faculty created successfully!", { id: toastId });
      } else {
        throw new Error(res.message || "Failed to create faculty");
      }
    } catch (err: any) {
      console.error("Error creating faculty:", err);
      toast.error(
        err?.data?.message || 
        err.message || 
        "Failed to create faculty", 
        { id: toastId }
      );
    }
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
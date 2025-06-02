"use client"

import FDatePicker from "@/app/components/form/FDatePicker";
import PHInput from "@/app/components/form/FInput";
import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { semesterStatusOptions } from "@/constant/semester";
import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "@/redux/features/admin/courseManagement.api";
import { TResponse } from "@/types/global";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";


const SemesterRegistration = () => {

  const [addSemester] = useAddRegisteredSemesterMutation();
  
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: 'sort', value: 'year' },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <FSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <FSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <FDatePicker name="startDate" label="Start Date" />
          <FDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { monthOptions, semesterOptions } from "@/constant/semester";
import { useAddAcademicSemesterMutation } from "@/redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "@/Schemas/AcademicManagement.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

const onSubmit: SubmitHandler<FieldValues> = async (data) => {

  const toastId = toast.loading('Creating...');

  try {
    const name = semesterOptions.find(opt => opt.value === data.name)?.label;
    
    if (!name) {
      throw new Error('Invalid semester selection');
    }

    // Convert numeric month values to month names
    const startMonth = monthOptions.find(opt => opt.value === data.startMonth)?.label;
    const endMonth = monthOptions.find(opt => opt.value === data.endMonth)?.label;

    if (!startMonth || !endMonth) {
      throw new Error('Invalid month selection');
    }

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth, // Now sending month name instead of number
      endMonth,   // Now sending month name instead of number
    };

    console.log('Submitting:', semesterData);

    const result = await addAcademicSemester(semesterData).unwrap();

    toast.success('Semester created successfully!', { id: toastId });
    
  } catch (error: any) {
    console.error('Creation error:', error);
    
    let errorMessage = 'Failed to create semester';

    if (error.data?.errorSources) {
      errorMessage = error.data.errorSources
        .map((err: any) => `${err.path}: ${err.message}`)
        .join('\n');
    } else if (error.message) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, { id: toastId });
  }
};

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <FSelect label="Name" name="name" options={semesterOptions} />
          <FSelect label="Year" name="year" options={yearOptions} />
          <FSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <FSelect label="End Month" name="endMonth" options={monthOptions} />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
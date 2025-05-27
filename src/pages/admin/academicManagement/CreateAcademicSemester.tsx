import PHForm from "@/app/components/form/From";
import FSelect from "@/app/components/form/FSelect";
import { monthOptions, semesterOptions } from "@/constant/semester";
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

  // const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const toastId = toast.loading('Creating...');

    const name = semesterOptions[Number(data?.name) - 1]?.label;

    // const semesterData = {
    //   name,
    //   code: data.name,
    //   year: data.year,
    //   startMonth: data.startMonth,
    //   endMonth: data.endMonth,
    // };

    // try {
    //   const res = (await addAcademicSemester(semesterData)) as TResponse;
    //   console.log(res);
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success('Semester created', { id: toastId });
    //   }
    // } catch (err) {
    //   toast.error('Something went wrong', { id: toastId });
    // }
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

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;

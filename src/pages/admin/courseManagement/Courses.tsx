"use client"
import PHForm from '@/app/components/form/From';
import FSelect from '@/app/components/form/FSelect';

import { useAddFacultyMutation, useGetAllCoursesQuery } from '@/redux/features/admin/courseManagement.api';
import { useGetAllFacultiesQuery } from '@/redux/features/admin/usermanagement.api';
import { Button, message, Modal, Table } from 'antd';
import { useState } from 'react';

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};


const AddFacultyModal = ({ facultyInfo }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);

  const [addFaculties] =  useAddFacultyMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({

    value: item._id,
    label: item.fullName,

  }));

const handleSubmit = async (data: { faculties: string[] }) => {

  try {


    // Ensure faculties is always an array
    const facultiesArray = Array.isArray(data.faculties) 
      ? data.faculties 
      : [data.faculties];

    // Prepare the payload in correct format
    const payload = {
      
      courseId: facultyInfo.key,
      data: {
        faculties: facultiesArray

      }
      
    };

    console.log('Submitting:', payload); // Debug log

    await addFaculties(payload).unwrap();

    message.success('Faculties assigned successfully');
    
    setIsModalOpen(false);
  } catch (error) {
    console.error('Assignment failed:', error);
    message.error('Failed to assign faculties');
  }

};

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <FSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
'use client'
import {  useGetAllFacultyQuery } from '@/redux/features/admin/academicManagement.api';

import { Button, Table, TableColumnsType, TableProps } from 'antd';


export type TTableData = {
  key: string;
  name: string;
  academicFaculty: string;
 
};

const AcademicFaculty = () => {


  
  const { data:facultyData, isLoading, isFetching } = useGetAllFacultyQuery();

  // Prepare table data
  const tableData = facultyData?.data?.map((faculty: any) => ({
    key: faculty._id,
    name: faculty.name,
 
  })) || [];


  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Faculty Name',
      dataIndex: 'name',
      key: 'name',
    },
   
    {
      title: 'Action',
      key: 'action',
      render: () => <Button>Update</Button>,
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
        _sorter,
 
  ) => {
  };

  return (
    <Table
      loading={isLoading || isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      rowKey="key"
    />
  );
};

export default AcademicFaculty;
'use client'
import { useGetAllDepartmentQuery } from '@/redux/features/admin/academicManagement.api';
import { TQueryParam } from '@/types/global';
import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';


export type TTableData = {
  key: string;
  name: string;
  academicFaculty: string;
 
};

const AcademicFaculty = () => {

  const [params, setParams] = useState<TQueryParam[]>([]);
  
  const { data: departmentData, isLoading, isFetching } = useGetAllDepartmentQuery(params);

  // Prepare table data
  const tableData = departmentData?.data?.map((department: any) => ({
    key: department._id,
    name: department.name,
    academicFaculty: department.academicFaculty._id,
    facultyName: department.academicFaculty.name
  })) || [];

  // Prepare faculty filters from the data
  const facultyFilters = Array.from(
    new Set(tableData.map(item => item.facultyName))
  ).map(faculty => ({
    text: faculty,
    value: faculty,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Faculty',
      dataIndex: 'facultyName',
      key: 'facultyName',
      filters: facultyFilters,
      onFilter: (value, record) => record.facultyName === value,
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
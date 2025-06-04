'use client'
import { useGetAllFacultiesQuery } from '@/redux/features/admin/usermanagement.api';
import { TQueryParam } from '@/types/global';
import { TFaculty } from '@/types/userManagement.type';
import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

// Define the table data type based on TFaculty
export type TFacultyTableData = {
  key: string; // Required for Ant Table
  id: string;
  name: string; // Combined from name.firstName, name.middleName, name.lastName
  email: string;
  contactNo: string;
  designation: string;
  department: string; // From academicDepartment
};

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  
  const { 
    data: facultyData, 
    isLoading, 
    isFetching,
    error 
  } = useGetAllFacultiesQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  console.log(facultyData)

  // Transform faculty data for the table
  const tableData: TFacultyTableData[] = facultyData?.data?.map((faculty) => ({
    key: faculty._id, // Using _id as key
    id: faculty.id,
    name: `${faculty.name?.firstName} ${faculty.name?.middleName || ''} ${faculty.name?.lastName}`.trim(),
    email: faculty.email,
    contactNo: faculty.contactNo,
    designation: faculty.designation,
    department: faculty.academicDepartment?.name || 'N/A'
  })) || [];

  const columns: TableColumnsType<TFacultyTableData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contactNo',
      key: 'contactNo',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/faculty-data/${record.key}`}>
            <Button size="small">Details</Button>
          </Link>
          <Button size="small">Update</Button>
          <Button size="small" danger>Block</Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TFacultyTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];
      
      if (filters.designation) {
        queryParams.push({ name: 'designation', value: filters.designation.join(',') });
      }
      
      if (filters.department) {
        queryParams.push({ name: 'academicDepartment', value: filters.department.join(',') });
      }

      setParams(queryParams);
    }
  };

  if (error) {
    return <div>Error loading faculty data</div>;
  }

  return (
    <div className="p-4">
      <Table
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: true }}
      />
      <div className="mt-4 flex justify-end">
        <Pagination
          current={page}
          onChange={setPage}
          pageSize={facultyData?.meta?.limit}
          total={facultyData?.meta?.total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FacultyData;
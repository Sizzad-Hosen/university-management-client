'use client'
import { useGetAllSemestersQuery } from '@/redux/features/admin/academicManagement.api';
import { TAcademicSemester } from '@/types/academicManagement.type';
import { TQueryParam } from '@/types/global';
import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';

export type TTableData = Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
> & {
  key: string;
};
const AcademicSemester = () => {

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);

  console.log('data',semesterData)

  console.log({ isLoading, isFetching });

 const tableData = (semesterData?.data?.map(

  (semester: TAcademicSemester) => ({
    key: semester._id,
    name: semester.name,
    startMonth: semester.startMonth,
    endMonth: semester.endMonth,
    year: semester.year,
  })
)) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text: 'Fall',
          value: 'Fall',
        },
        {
          text: 'Summer',
          value: 'Summer',
        },
      ],
    },
    {
      title: 'Year',
      key: 'year',
      dataIndex: 'year',
      filters: [
        {
          text: '2024',
          value: '2024',
        },
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2026',
        },
      ],
    },
    {
      title: 'Start Month',
      key: 'startMonth',
      dataIndex: 'startMonth',
    },
    {
      title: 'End Month',
      key: 'endMonth',
      dataIndex: 'endMonth',
    },
    {
      title: 'Action',
      key: 'x',
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

interface IFilters {
  name?: (string | number | boolean)[];
  year?: (string | number | boolean)[];
  // Add other filterable columns here
}

const onChange: TableProps<TTableData>['onChange'] = (
  _pagination,
  filters: IFilters,
  _sorter,
  extra
) => {
    if (extra.action === 'filter') {

      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;

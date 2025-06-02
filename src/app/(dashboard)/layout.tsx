'use client';

import React from 'react';
import { Layout, Menu, theme } from 'antd';

import type { MenuProps } from 'antd';
import { logout, useCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Link from 'next/link';


const { Header, Content, Footer, Sider } = Layout;

type role={
  ADMIN:string;
  STUDENT:string;
  FACULTY:string;

}

export const userRole:role = {
  ADMIN: "admin",
  STUDENT: "student",
  FACULTY: "faculty",
} as const;

export type Role = keyof typeof userRole; // "ADMIN" | "STUDENT" | "FACULTY"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = useAppSelector(useCurrentUser);

  console.log('current user', user);

  

  const getMenuItems = (): MenuProps['items'] => {
    switch (user?.role) {
      case userRole.ADMIN:
        return [
          {
            key: 'admin/dashboard',
            label: <Link href="/dashboard">Dashboard</Link>,
          },

          {
                key: 'Academic Semester Management',
                label: 'AcademicManagement',
                children:[

                 {
                 key: 'createAcademicSemester',
                 label: <Link href="/admin/create-academic-semester"> Create.A.Semester</Link>,
                 },
                 {
                 key: 'academicSemester',
                 label: <Link href="/admin/academic-semester"> Academic Semester</Link>,
                 },
                 {
                 key: 'createAcademicDepartment',
                 label: <Link href="/admin/create-academic-department"> Create.A.Department</Link>,
                 },
                 {
                 key: 'academicDepartment',
                 label: <Link href="/admin/academic-department"> Academic Department</Link>,
                 },
                 {
                 key: 'createAcademicFaculty',
                 label: <Link href="/admin/create-academic-faculty"> Create.A.Faculty</Link>,
                 },
                 {
                 key: 'academicFaculty',
                 label: <Link href="/admin/academic-faculty"> Academic Faculty</Link>,
                 },

                ]
              
          },

          {
                key: 'Course Management',
                label: 'CourseManagement',
                children:[

                 {
                 key: 'semesterRegistration',
                 label: <Link href="/admin/semester-registration"> Semesters Registration'</Link>,
                 },
                 {
                 key: 'registeredSemesters',
                 label: <Link href="/admin/registered-semesters"> Registered Semesters'</Link>,
                 },
                 {
                 key: 'createCourses',
                 label: <Link href="/admin/create-course"> Create Course</Link>,
                 },
                 {
                 key: 'courses',
                 label: <Link href="/admin/courses"> Courses</Link>,
                 },
                

                ]
              
          },


          {
            key: 'userManagement',
            label: 'User Management',
            children: [
              {
                key: 'createAdmin',
                label: <Link href="/admin/create-admin">Create Admin</Link>,
              },
              {
                key: 'createStudent',
                label: <Link href="/admin/create-student">Create Student</Link>,
              },
              {
                key: 'createFaculty',
                label: <Link href="/admin/create-faculty">Create Faculty</Link>,
              },
              {
                key: 'students',
                label: <Link href="/admin/student-data">Students</Link>,
              },
            
            ],
          },
        ];
      case userRole?.STUDENT:
        return [
          {
            key: 'dashboard',
            label: <Link href="student/dashboard">Dashboard</Link>,
          },
          
          {
            key: 'offercourse',
            label: 'OfferCourse',

            children: [
              {
              key: 'myCourses',
              label: <Link href="/student/my-courses">My Courses</Link>,
            },

              {
                key: 'results',
                label: <Link href="/student/results">My Results</Link>,
              },
              {
                key: 'profile',
                label: <Link href="/profile">Profile</Link>,
              },
            ]
          }
        
        ];
      case userRole?.FACULTY:
        return [
          {
            key: 'dashboard',
            label: <Link href="faculty/dashboard">Dashboard</Link>,
          },

            
          {
            key: 'offercourse',
            label: 'OfferCourse',

            children: [
              {
                key: 'myClasses',
                label: <Link href="/faculty/my-classes">My Classes</Link>,
              },
              {
                key: 'gradeStudents',
                label: <Link href="/faculty/grade-students">Grade Students</Link>,
              },
              {
                key: 'profile',
                label: <Link href="faculty/profile">Profile</Link>,
              },
            ]
          }
          
        ];
      default:
        return [
          {
            key: 'dashboard',
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: 'profile',
            label: <Link href="/profile">Profile</Link>,
          },
        ];
    }
  };

  const items = getMenuItems();

  const dispatch = useAppDispatch();


  const handleLogout = ()=>{
  
      dispatch(logout())
    }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <h1 className="ps-4 p-2 text-white">
          <Link href={"/"}>
          PH UNI
          </Link>
          
          </h1>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={items} />
      </Sider>

      <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
  <div className="flex justify-end p-4">
    <button
      onClick={handleLogout}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
    >
      Logout
    </button>
  </div>
</Header>



        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children} {/* 🔥 Dynamic page */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PH University ©{new Date().getFullYear()} Created by PH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

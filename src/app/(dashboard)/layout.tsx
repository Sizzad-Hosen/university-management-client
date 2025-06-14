'use client';

import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';

import type { MenuProps } from 'antd';
import { logout, selectCurrentUser} from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Link from 'next/link';
import Image from 'next/image';
import Home from '../components/Home/Home';


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

  const user = useAppSelector(selectCurrentUser);

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
                
                 {
                 key: 'offerCourse',
                 label: <Link href="/admin/offer-course"> Offer Courses</Link>,
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
              {
                key: 'faculties',
                label: <Link href="/admin/faculty-data">Faculties</Link>,
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
              key: 'offeredCourse',
              label: <Link href="/student/offered-course">Offered Course</Link>,
          },
          {
              key: 'mySchedule',
              label: <Link href="/student/schedule">My Schedule</Link>,
          },
        //     children: [
        //       {
        //       key: 'myCourses',
        //       label: <Link href="/student/my-courses">My Courses</Link>,
        //     },

        //       {
        //         key: 'results',
        //         label: <Link href="/student/results">My Results</Link>,
        //       },
        //       {
        //         key: 'profile',
        //         label: <Link href="/profile">Profile</Link>,
        //       },
        //     ]
        //   }
        
        // ];
        ]

      case userRole?.FACULTY:
        return [
          {
            key: 'dashboard',
            label: <Link href="/dashboard">Dashboard</Link>,
          },
          {
            key: 'myCourses',
            label: <Link href="/faculty/courses">My Courses</Link>,
          },
          

        ]


          // {
          //   key: 'offercourse',
          //   label: 'OfferCourse',

          //   children: [
          //     {
          //       key: 'myClasses',
          //       label: <Link href="/faculty/my-classes">My Classes</Link>,
          //     },
          //     {
          //       key: 'gradeStudents',
          //       label: <Link href="/faculty/grade-students">Grade Students</Link>,
          //     },
          //     {
          //       key: 'profile',
          //       label: <Link href="faculty/profile">Profile</Link>,
          //     },
          //   ]
          // }
          
        
      default:
        return [
          {
            key: 'dashboard',
            label: <Link href="/">Home</Link>,
          },
          {
            key: 'about',
            label: <Link href="/about">About</Link>,
          },
          {
            key:'login',
            label: <Link href="/login">Login</Link>,
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
          <Image 
          width={130}
          height={60}
          alt="brur"
          className='ps-10 p-2 text-3xl'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BRUR_Logo.svg/640px-BRUR_Logo.svg.png" />
        
        </Link>

          </h1>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={items} />
      
        </Sider>

       <Layout>

       <Header style={{ padding: 0, background: colorBgContainer }}>

   <div className="flex justify-end p-4">
  
  
      <Button
      onClick={handleLogout}
       type="primary" size={20}>
            Logout
          </Button>

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
            {
              !user==true?  <Home></Home> : []
            }
           

            {children} {/* 🔥 Dynamic page */}


          </div>
        </Content>


        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by  Md Sizzad Hosen
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

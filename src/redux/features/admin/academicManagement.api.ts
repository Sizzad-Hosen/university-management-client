import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { TResponseRedux } from "@/types/global";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // academic faculties
getAllFaculty: builder.query({
  query: () => ({
    url: '/academic-faculties',
    method: 'GET',
  }),
  transformResponse: (response: TResponseRedux<any>) => ({
    data: response.data,
    meta: response.meta
  }),
}),

    
// academc semester
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        
        if (args?.length) {
          params.append(args[0].name, args[0].value);
        }
        return {
          url: '/academic-semesters',
          method: 'GET',
          params: params
        };
      },

      transformErrorResponse: (
        baseQueryReturnValue: FetchBaseQueryError
      ) => {
        // Handle the error response according to your API's error structure
        return {
          status: baseQueryReturnValue.status,
          message: (baseQueryReturnValue.data as any)?.message || 'An error occurred',
          // Add other error properties as needed
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => ({
        data: response.data,
        meta: response.meta
      })
    }),
    
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data
      })
    }),

    // academic depertment

       addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data
      })
    }),
    getAllDepartment: builder.query({
      query: () => ({
        url: '/academic-departments',
        method: 'GET',
      }),
      transformResponse: (response: TResponseRedux<any>) => ({
        data: response.data,
        meta: response.meta
      }),
    }),

  

      
  }),
});



export const { useGetAllFacultyQuery,useGetAllSemestersQuery,useAddAcademicSemesterMutation,useAddAcademicDepartmentMutation ,useGetAllDepartmentQuery} = academicManagementApi;

import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { TResponseRedux } from "@/types/global";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({ 
      query: () => ({
        url: '/academic-semesters',
        method: 'GET',
      }),
      transformErrorResponse:(response:TResponseRedux<TAcademicSemester[]>)=>{
       
        return {
         data:response.data,
         meta:response.meta,
      };
    };
    }),
  

    addAcademicSemester : builder.mutation({
        query:(data)=>({
            url:'/academic-semesters/create-academic-semester',
            method:'POST',
            body:data
        })
    })
  }),
});



export const { useGetAllSemestersQuery,useAddAcademicSemesterMutation } = academicManagementApi;

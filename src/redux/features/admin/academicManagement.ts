import { baseApi } from "@/redux/api/baseApi";


type Semester = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
 
};

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query<Semester[], void>({ // <- Type added
      query: () => ({
        url: '/academic-semesters',
        method: 'GET',
      }),
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

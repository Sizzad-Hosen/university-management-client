import { baseApi } from "@/redux/api/baseApi";

import { TCourses, TSemester } from "@/types/courseManagement.type";
import { TQueryParam, TResponseRedux } from "@/types/global";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({

                  getAllRegisteredSemester: builder.query({

              query: (args) => {
                console.log(args);
                const params = new URLSearchParams();
        
                if (args) {
                  args.forEach((item: TQueryParam) => {
                    params.append(item.name, item.value as string);
                  });
                }
        
                return {
                  url: '/semester-registrations',
                  method: 'GET',
                   params: params,
                };
              },
              providesTags:['semester'],
              transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                  data: response.data,
                  meta: response.meta,
                };
              },
            }),


        addRegisteredSemester:builder.mutation({
            query:(data)=>({
                url:'/semester-registrations/create-semester-registration',
                method:'POST',
                body:data
            })
        }),
        updateSemesterRegistration:builder.mutation({
            query:(args)=>({
                url:`/semester-registrations/${args.id}`,
                method:'PATCH',
                body:args.data
            }),
            invalidatesTags:['semester']
        }),

        // courses
            addCourses:builder.mutation({
            query:(data)=>({
                url:'/courses/create-course',
                method:'POST',
                body:data
            })
        }),
        // add faculties
            addFaculties:builder.mutation({
            query:(args)=>({
                url:`/courses/${args.courseId}/assign-faculties`,
                method:'PUT',
                body:args.data
            })
        }),

        getAllCourses: builder.query({

              query: (args) => {

                console.log(args);

                const params = new URLSearchParams();
        
                if (args) {
                  args.forEach((item: TQueryParam) => {
                    params.append(item.name, item.value as string);
                  });
                }
        
                return {
                  url: '/courses',
                  method: 'GET',
                   params: params,
                };
              },

              providesTags:['courses'],
              transformResponse: (response: TResponseRedux<TCourses[]>) => {
                return {
                  data: response.data,
                  meta: response.meta,
                };
              },
            }),
    })
})


export const {useAddRegisteredSemesterMutation,useGetAllRegisteredSemesterQuery,useUpdateSemesterRegistrationMutation,useAddCoursesMutation,useGetAllCoursesQuery,useAddFacultiesMutation} = courseManagementApi;

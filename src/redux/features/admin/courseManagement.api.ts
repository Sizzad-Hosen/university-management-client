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
        // add faculties
            addFaculty:builder.mutation({
            query:(args)=>({
              url:`/courses/${args.courseId}/assign-faculties`,
              method:'PUT',
              body:args.data
            })
            
        }),

          getCourseFaculty: builder.query({
        query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: 'GET',
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // offered course
          addOfferCourse:builder.mutation({
            query:(data)=>({
              url:'/offered-course/create-offered-course',
              method:'POST',
              body:data
            })
            
        }),



    })
})


export const {useAddRegisteredSemesterMutation,useGetCourseFacultyQuery,useGetAllRegisteredSemesterQuery,useUpdateSemesterRegistrationMutation,useAddCoursesMutation,useGetAllCoursesQuery,useAddFacultyMutation,useAddOfferCourseMutation} = courseManagementApi;

import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TFaculty, TStudent } from "@/types/userManagement.type";

const userManagementApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

           getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/students',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
        addStudent:builder.mutation({
            query:(data)=>({
                url:'/users/create-student',
                method:'POST',
                body:data,
            })
        }),
        // facultiesnpm run dev
        
     getAllFaculties: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/faculties',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
        addFaculties:builder.mutation({
            query:(data)=>({
                url:'/users/create-faculty',
                method:'POST',
                body:data,
            })
        }),

      // password chnage
    changePassword: builder.mutation({
    query: ({ oldPassword, newPassword }) => ({
    url: '/auth/change-password',
    method: 'POST',
    body: { oldPassword, newPassword }, // Fixed: Proper object structure
    headers: {
      'Content-Type': 'application/json'
    }
  }),
}),


    })
})




export const {useAddStudentMutation,useGetAllStudentsQuery ,useAddFacultiesMutation,useGetAllFacultiesQuery,useChangePasswordMutation}= userManagementApi;


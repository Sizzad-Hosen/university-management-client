import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TStudent } from "@/types/userManagement.type";

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
        })
    })
})



export const {useAddStudentMutation,useGetAllStudentsQuery }= userManagementApi;


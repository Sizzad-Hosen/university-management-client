import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { TSemester } from "@/types/courseManagement.type";
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
        })
    })
})


export const {useAddRegisteredSemesterMutation,useGetAllRegisteredSemesterQuery} = courseManagementApi;

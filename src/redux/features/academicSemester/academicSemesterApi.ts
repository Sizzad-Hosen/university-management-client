import { baseApi } from "@/redux/api/baseApi";

// (Optional) Define a type for a Semester
type Semester = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  // add more fields if needed
};

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query<Semester[], void>({ // <- Type added
      query: () => ({
        url: '/academic-semesters',
        method: 'GET',
      }),
    }),
  }),
});

// ✅ Correct export
export const { useGetAllSemestersQuery } = academicSemesterApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EmployeeType } from '../../types/Employee';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API }),
  tagTypes: ['Employees'],
  endpoints: builder => ({
    getEmployees: builder.query<EmployeeType[], void>({
      query: () => `/employees`,
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation<EmployeeType, EmployeeType>({
      query: body => {
        return {
          url: `/employees`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Employees'],
    }),
    updatePost: builder.mutation<EmployeeType, EmployeeType>({
      query: body => {
        return {
          url: `/employees/${body.id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Employees'],
    }),
    deleteEmployee: builder.mutation<EmployeeType, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdatePostMutation,
} = employeesApi;

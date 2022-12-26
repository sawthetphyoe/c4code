import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coursesApi = createApi({
  reducerPath: 'courses',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/api/v1/courses',
    credentials: 'include',
  }),
  endpoints(builder) {
    return {
      createCourse: builder.mutation({
        invalidatesTags: (result, error, course) =>
          result ? [{ type: 'course', id: result.data.data.id }] : [],
        query: (course) => {
          return {
            url: '/',
            method: 'POST',
            body: course,
          };
        },
      }),
      getCourse: builder.query({
        providesTags: (result, error, id) =>
          result ? [{ type: 'course', id }] : [],
        query: (id) => {
          return {
            url: `${id}`,
            method: 'GET',
          };
        },
      }),
      getAllCourses: builder.query({
        providesTags: (result, error) =>
          result
            ? [
                ...result.data.data.map((course) => {
                  return { type: 'course', id: course.id };
                }),
              ]
            : [],
        query: () => {
          return {
            url: '/',
            method: 'GET',
          };
        },
      }),
      updateCourse: builder.mutation({
        invalidatesTags: (result, error, course) =>
          result ? [{ type: 'course', id: course.id }] : [],
        query: (course) => {
          return {
            url: `${course.id}`,
            method: 'PATCH',
            body: course,
          };
        },
      }),
      deleteCourse: builder.mutation({
        invalidatesTags: (result, error, id) =>
          !error ? [{ type: 'course', id }] : [],
        query: (id) => {
          return {
            url: `${id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useCreateCourseMutation,
  useGetCourseQuery,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
export { coursesApi };

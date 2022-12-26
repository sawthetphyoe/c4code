import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/api/v1/users',
    credentials: 'include',
  }),
  endpoints(builder) {
    return {
      createUser: builder.mutation({
        invalidatesTags: (result, error, user) => (result ? ['user'] : []),
        query: (user) => {
          return {
            url: 'register',
            method: 'POST',
            body: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
            },
          };
        },
      }),
      getAllUsers: builder.query({
        providesTags: (result, error) => {
          return result
            ? [
                ...result.data.data.map((user) => ({
                  type: 'user',
                  id: user._id,
                })),
              ]
            : [];
        },
        query: () => {
          return {
            url: '/',
            method: 'GET',
          };
        },
      }),
      getUserById: builder.query({
        providesTags: (result, error, id) =>
          result ? [{ type: 'user', id }] : [],
        query: (id) => {
          return {
            url: `${id}`,
            method: 'GET',
          };
        },
      }),
      updateUserById: builder.mutation({
        invalidatesTags: (result, error, user) =>
          result ? [{ type: 'user', id: user.id }] : [],
        query: (user) => {
          return {
            url: `${user.id}`,
            method: 'PATCH',
            body: user.body,
          };
        },
      }),
      deleteUserById: builder.mutation({
        invalidatesTags: (result, error, id) =>
          !error ? [{ type: 'user', id }] : [],
        query: (id) => {
          return {
            url: `${id}`,
            method: 'DELETE',
          };
        },
      }),
      checkLogin: builder.query({
        providesTags: (result, error) => [{ type: 'loginUser' }],
        query: () => {
          return {
            url: 'check-login',
            method: 'GET',
          };
        },
      }),
      loginUser: builder.mutation({
        invalidatesTags: (result, error) => [{ type: 'loginUser' }],
        query: ({ email, password }) => {
          return {
            url: `login`,
            method: 'POST',
            body: {
              email,
              password,
            },
          };
        },
      }),
      userLogout: builder.mutation({
        invalidatesTags: (result, error, id) =>
          !error ? ['user', 'loginUser'] : [],
        query: () => {
          return {
            url: 'logout',
            method: 'GET',
          };
        },
      }),
      resetPassword: builder.mutation({
        query: (id) => {
          return {
            url: `resetPassword/${id}`,
            method: 'PATCH',
            body: {
              id: id,
            },
          };
        },
      }),
    };
  },
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useLoginUserMutation,
  useCheckLoginQuery,
  useUserLogoutMutation,
  useResetPasswordMutation,
} = usersApi;
export { usersApi };

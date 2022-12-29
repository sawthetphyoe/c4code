import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './apis/usersApi';
import { categoriesApi } from './apis/categoriesApi';
import { coursesApi } from './apis/coursesApi';
import { lectureApi } from './apis/lecturesApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(coursesApi.middleware)
      .concat(lectureApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useLoginUserMutation,
  useCheckLoginQuery,
  useUserLogoutMutation,
  useResetPasswordMutation,
} from './apis/usersApi';

export {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from './apis/categoriesApi';

export {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from './apis/coursesApi';

export {
  useCreateLectureMutation,
  useGetLectureQuery,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
} from './apis/lecturesApi';

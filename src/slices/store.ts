import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';


export const store = configureStore({
  reducer: {
    data: dataSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
// Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
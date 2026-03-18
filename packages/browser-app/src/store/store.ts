import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import threadsReducer from './threadsSlice'
import chatReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    threads: threadsReducer,
    chat: chatReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

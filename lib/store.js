import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { appSlice } from '@/lib/features/app/appSlice';

const rootReducer = combineSlices(appSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

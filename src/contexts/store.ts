import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './app'; 
import { authReducer } from './auth';
import { userReducer } from './user';
import { voteReducer } from './vote';

// Tạo middleware saga
const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  auth:authReducer,
  user:userReducer,
  vote: voteReducer,
});

const rootMiddleware = [...getDefaultMiddleware({ serializableCheck: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
  devTools: process.env.NODE_ENV !== 'production',
});


sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./app";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import {
  questionFormReducer,
  questionResultReducer,
  questionViewReducer,
} from "./question/questionReduce";
import { historyReducer } from "./history";
import { documentReducer } from "./document";
import { clientOfficeReducer, officeReducer } from "./business/businessReduce";

const sagaMiddleware = createSagaMiddleware();

const rootQuestReducer = combineReducers({
  view: questionViewReducer,
  form: questionFormReducer,
  result: questionResultReducer,
});

const rootBussinessReducer = combineReducers({
  office: officeReducer,
  client: clientOfficeReducer,
});

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  question: rootQuestReducer,
  history: historyReducer,
  document: documentReducer,
  business: rootBussinessReducer,
});

const rootMiddleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

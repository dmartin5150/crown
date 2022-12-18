import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { persistStore, PersistConfig} from "redux-persist";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
// import { persistedReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";


export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  blacklist: (keyof RootState)[]
}

const persistConfig:ExtendedPersistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [loggerMiddleware];
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  rootReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

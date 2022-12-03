import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
import { persistStore} from "redux-persist";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { persistedReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";


const persistConfig = {
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
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const compoesedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  rootReducer,
  undefined,
  compoesedEnhancers
);

sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

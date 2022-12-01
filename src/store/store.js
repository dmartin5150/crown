import {compose, createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';


import {rootReducer} from './root-reducer';


const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('current state', store.getState());

  next(action);

  console.log('next state ', store.getState());
}

const middlewares =[loggerMiddleware]
// const middlewares =[logger]

const compoesedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, compoesedEnhancers);
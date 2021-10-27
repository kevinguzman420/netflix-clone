import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import modalReducer from './modal/modalDuck';

const rootReducer = combineReducers({
  modalReducer,
});

export default function generateStore() {
  const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) );
  return store;
}

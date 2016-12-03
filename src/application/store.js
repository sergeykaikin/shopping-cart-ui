import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import hashHistory from '../hashHistory';

const reducer = combineReducers({
	routing: routerReducer
});

const middleware = [applyMiddleware(thunk /*for dispatching async actions*/, routerMiddleware(hashHistory))];
const enhancer = compose.apply(null, middleware);

export const configureStore = (state) => {
	return createStore(reducer, state, enhancer);
};

export default configureStore({} /*initial state*/);;
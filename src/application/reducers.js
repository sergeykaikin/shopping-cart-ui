import {handleActions} from 'redux-actions';
import {REQUEST_AVAILABLE_ITEMS, SET_AVAILABLE_ITEMS} from './actions';
import * as _  from 'lodash';

const initialState = {
    availableItems: [],
    loading: false
};

export default handleActions(
    {
        [REQUEST_AVAILABLE_ITEMS]: requestAvailableItems,
        [SET_AVAILABLE_ITEMS]: setAvailableItems
    },
    initialState
);

export function requestAvailableItems(state) {
    const loading = true;

    return _.assign({}, state, {loading});
}

export function setAvailableItems(state, action) {
    const availableItems = action.payload;
    const loading = false;

    return _.assign({}, state, {availableItems, loading});
}
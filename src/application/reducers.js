import {handleActions} from 'redux-actions';
import {
    REQUEST_AVAILABLE_ITEMS, 
    SET_AVAILABLE_ITEMS,
    ADD_ITEM_TO_SHOPPING_CART
} from './actions';
import * as _  from 'lodash';

const initialState = {
    availableItems: [],
    loading: false,
    shoppingCartItems: []
};

export default handleActions(
    {
        [REQUEST_AVAILABLE_ITEMS]: requestAvailableItems,
        [SET_AVAILABLE_ITEMS]: setAvailableItems,
        [ADD_ITEM_TO_SHOPPING_CART]: addItemToShoppingCart
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

export function addItemToShoppingCart(state, action) {
    const itemIndexById = _.findIndex(state.shoppingCartItems, i => i.id === action.payload.id);
    let shoppingCartItems = state.shoppingCartItems.slice();

    if (itemIndexById > -1) {
        shoppingCartItems.splice(itemIndexById, 1);
    }
    
    shoppingCartItems.push(action.payload);
    
    return _.assign({}, state, {shoppingCartItems});
}
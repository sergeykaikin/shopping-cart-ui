import {handleActions} from 'redux-actions';
import {
    REQUEST_AVAILABLE_ITEMS, 
    SET_AVAILABLE_ITEMS,
    ADD_ITEM_TO_SHOPPING_CART,
    CHECKOUT_ITEMS
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
        [ADD_ITEM_TO_SHOPPING_CART]: addItemToShoppingCart,
        [CHECKOUT_ITEMS]: checkoutItems
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

export function checkoutItems(state, action) {
    let shoppingCartItems = state.shoppingCartItems.slice();
    let availableItems = state.availableItems.slice();

    _.cloneDeep(shoppingCartItems).forEach(sci => {
        const availableItemIndex = _.findIndex(availableItems, i => i.id === sci.id);
        const availableItem = availableItems[availableItemIndex];

        if (availableItem && sci.quantity <= availableItem.count) {
            shoppingCartItems.splice(_.findIndex(shoppingCartItems, i => i.id === sci.id), 1);
            availableItems.splice(availableItemIndex, 1, {
                id: availableItem.id,
                name: availableItem.name,
                description: availableItem.description,
                count: (availableItem.count - sci.quantity)
            });
        }
    });

    return _.assign({}, state, {availableItems, shoppingCartItems}); 
}
import {push} from 'react-router-redux';

export function navigateToShoppingCart(dispatch) {
    dispatch(push('/shopping-cart'));
}
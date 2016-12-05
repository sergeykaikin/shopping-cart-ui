import * as React from 'react';
import {default as ConnectedShoppingCart} from './ShoppingCart';
import {mountWithStore} from '../utils/test-utils';

const shoppingCartItems = [{
    id: 1,
    name: 'Item 1',
    quantity: 1
}, {
    id: 2,
    name: 'Item 2',
    quantity: 10
}];

it('should display all item which have been added to the cart', () => {
  const wrapper = mountWithStore(<ConnectedShoppingCart/>, {application: {
      availableItems: [],
      loading: false,
      shoppingCartItems
  }});
  
  expect(wrapper.find('.ShoppingCart').at(0).text().indexOf('Item 1 (1)')).not.toBe(-1);
  expect(wrapper.find('.ShoppingCart').at(0).text().indexOf('Item 2 (10)')).not.toBe(-1);
});
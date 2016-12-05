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

it('should reduce stock depending on checked out items', () => {
  const wrapper = mountWithStore(<ConnectedShoppingCart/>, {application: {
    availableItems: [{
        id: 1,
        name: 'Item 1',
        description: 'Item 1 description',
        count: 5
    }, {
        id: 2,
        name: 'Item 2',
        description: 'Item 2 description',
        count: 10
    }],
    loading: false,
    shoppingCartItems
  }});

  wrapper.find('.ShoppingCart-checkoutBnt').simulate('click');
  const appState = wrapper.context().store.getState().application;
  
  expect(appState.availableItems[0].count).toBe(4);
  expect(appState.availableItems[1].count).toBe(0);
  expect(appState.shoppingCartItems.length).toBe(0); //shopping cart emptied on check out
});

it('should not allow to checkout items which are not available', () => {
  const wrapper = mountWithStore(<ConnectedShoppingCart/>, {application: {
    availableItems: [{
        id: 1,
        name: 'Item 1',
        description: 'Item 1 description',
        count: 0
    }],
    loading: false,
    shoppingCartItems 
  }});

  wrapper.find('.ShoppingCart-checkoutBnt').simulate('click');
  const appState = wrapper.context().store.getState().application;
  
  expect(appState.availableItems[0].count).toBe(0);
  expect(appState.shoppingCartItems.length).toBe(2); //shopping cart did not change because checkout items are not available
});
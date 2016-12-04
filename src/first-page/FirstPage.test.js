import * as React from 'react';
import FirstPage from './FirstPage';
import {mountWithStore} from '../utils/test-utils';

const availableItems = [{
    id: 1,
    name: 'Item 1',
    description: 'Item 1 description',
    count: 1
}, {
    id: 2,
    name: 'Item 2',
    description: 'Item 2 description',
    count: 10
}, {
    id: 3,
    name: 'Item 3',
    description: 'Item 3 description',
    count: 0
}];

it('should render all available items from the store', () => {
  const wrapper = mountWithStore(<FirstPage />, {application: {loading: false, availableItems}});
  
  expect(wrapper.find('.AvailableItem').length).toBe(3);
});

it('should render id, name, description and stock quantity for each available item', () => {
  const wrapper = mountWithStore(<FirstPage />, {application: {loading: false, availableItems}});
  
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-name').text()).toBe('Item 1');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-description').text()).toBe('Item 1 description');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-id').text()).toBe('1');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-count').text()).toBe('1');

  expect(wrapper.find('.AvailableItem').at(1).find('.AvailableItem-name').text()).toBe('Item 2');
  expect(wrapper.find('.AvailableItem').at(1).find('.AvailableItem-description').text()).toBe('Item 2 description');
  expect(wrapper.find('.AvailableItem').at(1).find('.AvailableItem-id').text()).toBe('2');
  expect(wrapper.find('.AvailableItem').at(1).find('.AvailableItem-count').text()).toBe('10');

  expect(wrapper.find('.AvailableItem').at(2).find('.AvailableItem-name').text()).toBe('Item 3');
  expect(wrapper.find('.AvailableItem').at(2).find('.AvailableItem-description').text()).toBe('Item 3 description');
  expect(wrapper.find('.AvailableItem').at(2).find('.AvailableItem-id').text()).toBe('3');
  expect(wrapper.find('.AvailableItem').at(2).find('.AvailableItem-count').text()).toBe('0');
});
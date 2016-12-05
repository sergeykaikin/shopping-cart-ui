import * as React from 'react';
import {default as ConnectedFirstPage} from './FirstPage';
import {FirstPage} from './FirstPage';
import {mountWithStore} from '../utils/test-utils';
import {mount} from 'enzyme';

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
  const wrapper = mount(<FirstPage availableItems={availableItems} loading={false}/>);
  
  expect(wrapper.find('.AvailableItem').length).toBe(3);
});

it('should render id, name, description and stock quantity for each available item', () => {
  const wrapper = mount(<FirstPage availableItems={availableItems} loading={false}/>);
  
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

it('should filter available items by name and id on filter input change (1)', () => {
  const wrapper = mount(<FirstPage availableItems={availableItems} loading={false}/>);

  wrapper.setState({filterValue: '1'});
  expect(wrapper.find('.AvailableItem').length).toBe(1);
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-name').text()).toBe('Item 1');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-description').text()).toBe('Item 1 description');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-id').text()).toBe('1');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-count').text()).toBe('1');
});

it('should filter available items by name and id on filter input change (2)', () => {
  const wrapper = mount(<FirstPage availableItems={availableItems} loading={false}/>);

  wrapper.setState({filterValue: 'item 2'});
  expect(wrapper.find('.AvailableItem').length).toBe(1);
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-name').text()).toBe('Item 2');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-description').text()).toBe('Item 2 description');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-id').text()).toBe('2');
  expect(wrapper.find('.AvailableItem').at(0).find('.AvailableItem-count').text()).toBe('10');
});

it('should filter available items by name and id on filter input change (3)', () => {
  const wrapper = mount(<FirstPage availableItems={availableItems} loading={false}/>);

  wrapper.setState({filterValue: 'does not exist'});
  expect(wrapper.find('.AvailableItem').length).toBe(0);
});

it('should change shopping cart accordingly when uses selects an item to add', () => {
  const wrapper = mountWithStore(<ConnectedFirstPage/>, {application: {
      availableItems,
      loading: false,
      shoppingCartItems: []
  }});
  
  wrapper.find('.AvailableItem').at(0).find('.AvailableItem-addBtn').simulate('click');
  expect(wrapper.find('.ShoppingCart').text().indexOf('Item 1')).not.toBe(-1);

  wrapper.find('.AvailableItem').at(2).find('.AvailableItem-addBtn').simulate('click');
  expect(wrapper.find('.ShoppingCart').text().indexOf('Item 3')).not.toBe(-1);
});

it('should add an item of a particular quantity to the shopping cart (1)', () => {
  const wrapper = mountWithStore(<ConnectedFirstPage/>, {application: {
      availableItems,
      loading: false,
      shoppingCartItems: []
  }});
  
  wrapper.find('.AvailableItem').at(0).find('.AvailableItem-plusQuantityBtn').simulate('click'); //no matter how many times 
  wrapper.find('.AvailableItem').at(0).find('.AvailableItem-plusQuantityBtn').simulate('click'); //you click add more
  wrapper.find('.AvailableItem').at(0).find('.AvailableItem-plusQuantityBtn').simulate('click'); //id the button is disabled
  wrapper.find('.AvailableItem').at(0).find('.AvailableItem-addBtn').simulate('click');
  expect(wrapper.find('.ShoppingCart').text().indexOf('Item 1 (1)')).not.toBe(-1);
});

it('should add an item of a particular quantity to the shopping cart (2)', () => {
  const wrapper = mountWithStore(<ConnectedFirstPage/>, {application: {
      availableItems,
      loading: false,
      shoppingCartItems: []
  }});
  
  wrapper.find('.AvailableItem').at(1).find('.AvailableItem-plusQuantityBtn').simulate('click'); //1+1=2
  wrapper.find('.AvailableItem').at(1).find('.AvailableItem-plusQuantityBtn').simulate('click'); //2+1=3
  wrapper.find('.AvailableItem').at(1).find('.AvailableItem-minusQuantityBtn').simulate('click'); //3-1=2
  wrapper.find('.AvailableItem').at(1).find('.AvailableItem-addBtn').simulate('click');
  expect(wrapper.find('.ShoppingCart').text().indexOf('Item 2 (2)')).not.toBe(-1);
});

it('should add an item of a particular quantity to the shopping cart (3)', () => {
  const wrapper = mountWithStore(<ConnectedFirstPage/>, {application: {
      availableItems,
      loading: false,
      shoppingCartItems: []
  }});
  
  wrapper.find('.AvailableItem').at(2).find('.AvailableItem-plusQuantityBtn').simulate('click'); //1+1=2
  wrapper.find('.AvailableItem').at(2).find('.AvailableItem-addBtn').simulate('click'); //can't add unavailable items
  expect(wrapper.find('.ShoppingCart').text().indexOf('Item 3')).toBe(-1);
});
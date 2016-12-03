import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  expect($('.App-header', div).text()).toBe('Welcome to React');
});

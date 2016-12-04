import {createAction} from 'redux-actions';
import * as axios from 'axios';
import * as _ from 'lodash';

export const REQUEST_AVAILABLE_ITEMS = 'REQUEST_AVAILABLE_ITEMS';
export const SET_AVAILABLE_ITEMS = 'SET_AVAILABLE_ITEMS';

const requestAvailableItems = createAction(REQUEST_AVAILABLE_ITEMS);
const setAvailableItems = createAction(SET_AVAILABLE_ITEMS);
const loadAvailableItems = () => dispatch => {
    dispatch(requestAvailableItems());

    axios.get('/data/example_data.csv')
        .then(response => {
            const lines = response.data.match(/[^\r\n]+/g);
            const availableItems = lines.map(line => {
                const values = line.split(',');

                return {
                    id: _.parseInt(values[0]),
                    name: values[1],
                    description: values[2],
                    count: _.parseInt(values[3])
                };
            });
            dispatch(setAvailableItems(availableItems));
        })
        .catch(error => {
            console.error('XHR Error: ', error);
        });
}

export {
    loadAvailableItems,
    requestAvailableItems,
    setAvailableItems  
};
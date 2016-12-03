import * as React from 'react';
import {mount} from 'enzyme';
import {configureStore} from '../application/store';

export function mountWithStore(node, store) {
    return mount(node, {
        context: {
            store: configureStore(store || {})
        },
        childContextTypes: {
            store: React.PropTypes.object.isRequired
        }
    });
}
import * as React from 'react';

import './ShoppingCart.css';

export default class ShoppingCart extends React.Component {
    render() {
        return (
            <div className="ShoppingCart">
                <div className="ShoppingCart-title">Shopping Cart</div>
                {this.renderItems()}
            </div>
        );
    }

    renderItems() {
        if (this.props.items && this.props.items.length > 0) {
            return (
                <ul>
                    {this.props.items.map(i => (
                        <div key={i.id}>{i.name}</div>
                    ))}
                </ul>
            );
        } else {
            return (
                <div>Shopping cart is empty</div>
            );
        }
    }
}

ShoppingCart.propTypes = {
    items: React.PropTypes.array
};
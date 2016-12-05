import * as React from 'react';
import {connect} from 'react-redux';
import {default as ShoppingCartItems} from '../components/shopping-cart/ShoppingCart';
import {checkoutItems} from '../application/actions';

export class ShoppingCart extends React.Component {
    render() {
        return (
            <div className="ShoppingCart">
                <ShoppingCartItems items={this.props.items} />
                <button
                    className="ShoppingCart-checkoutBnt"
                    onClick={() => this.props.dispatch(checkoutItems())}
                >
                    Checkout
                </button>
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    items: React.PropTypes.array
};

const mapStateToProps = (state) => {
    const appState = state.application;

    return {
        items: appState.shoppingCartItems
    };
};

export default connect(mapStateToProps)(ShoppingCart);
import * as React from 'react';
import {connect} from 'react-redux';
import {default as ShoppingCartItems} from '../components/shopping-cart/ShoppingCart';

export class ShoppingCart extends React.Component {
    render() {
        return (
            <div className="ShoppingCart">
                <ShoppingCartItems items={this.props.items} />
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
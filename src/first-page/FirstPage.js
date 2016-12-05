import * as React from 'react';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import AvailableItem from '../components/available-item/AvailableItem';
import ShoppingCart from '../components/shopping-cart/ShoppingCart';
import {addItemToShoppingCart} from '../application/actions';
import * as navigation from '../application/navigation';

import './FirstPage.css';

export class FirstPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterValue: ''
        };
    }

    render() {
        return (
            <div className="FirstPage">
                <div className="FirstPage__leftPane">
                    <input 
                        placeholder="Filter items by ID or name" 
                        type="text" 
                        value={this.state.filterValue} 
                        onChange={(e) => this.setState({filterValue: e.nativeEvent.target.value})} 
                    />
                    {this.props.loading ? <Loading/> : this.renderAvaibleItems()}
                </div>
                <div className="FirstPage__rightPane">
                    <ShoppingCart items={this.props.shoppingCartItems} />
                    <div>
                        <a 
                            className="AvailableItem-linkToCart"
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                navigation.navigateToShoppingCart(this.props.dispatch);
                            }}
                        >
                            Go to your shopping cart
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    renderAvaibleItems() {
        const filteredItems = this.props.availableItems.filter(i => {
            return i.id.toString().indexOf(this.state.filterValue) > -1 || i.name.toLowerCase().indexOf(this.state.filterValue) > -1;
        });

        if (filteredItems.length > 0) {
            return (
                <ul className="FirstPage__availableItems">
                    {filteredItems.map(i => (
                        <li key={i.id}>
                            <AvailableItem 
                                {...i} 
                                onItemAdd={(i) => this.props.dispatch(addItemToShoppingCart(i))}
                            />
                        </li>
                    ))}
                </ul>
            );
        } else {
            return (
                <div>Sorry... No items found</div>
            );
        }
    }
}

FirstPage.propTypes = {
    availableItems: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    shoppingCartItems: React.PropTypes.array
};

const mapStateToProps = (state) => {
    const appState = state.application;

    return {
        availableItems: appState.availableItems,
        loading: appState.loading,
        shoppingCartItems: appState.shoppingCartItems
    };
};

export default connect(mapStateToProps)(FirstPage);
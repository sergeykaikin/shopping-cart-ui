import * as React from 'react';
import './AvailableItem.css';

export default class AvailableItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1
        };
    }

    render() {
        const {id, name} = this.props;

        return (
            <div className="AvailableItem">
                <div className="AvailableItem-name">{this.props.name}</div>
                <div className="AvailableItem-description">{this.props.description}</div>
                <div className="AvailableItem__idContainer">
                    #<span className="AvailableItem-id">{this.props.id}</span>
                </div>
                <hr />
                <div>
                    Items available: <span className="AvailableItem-count">{this.props.count}</span>
                    <div className="AvailableItem__quantityButtonsCnt">
                        <button
                            className="AvailableItem-minusQuantityBtn"
                            disabled={this.props.count === 0 || this.state.quantity === 1}
                            onClick={() => this.setState({quantity: (this.state.quantity - 1)})}
                        >
                            -
                        </button>
                        <input 
                            className="AvailableItem-quantity"
                            type="text" 
                            value={this.state.quantity} 
                            disabled={true} 
                        />
                        <button
                            className="AvailableItem-plusQuantityBtn"
                            disabled={this.props.count === 0 || this.state.quantity === this.props.count}
                            onClick={() => this.setState({quantity: (this.state.quantity + 1)})}
                        >
                            +
                        </button>
                        <button 
                            className="AvailableItem-addBtn"
                            onClick={() => {
                                if (this.props.onItemAdd) {
                                    this.props.onItemAdd({id, name, quantity: this.state.quantity});
                                }
                                this.setState({quantity: 1});
                            }}
                            disabled={this.props.count === 0}
                        >
                            Add item
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AvailableItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,
    onItemAdd: React.PropTypes.func
};
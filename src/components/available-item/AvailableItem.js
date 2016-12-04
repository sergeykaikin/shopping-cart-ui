import * as React from 'react';
import './AvailableItem.css';

const AvailableItem = (props) => {
    return (
        <div className="AvailableItem">
            <div className="AvailableItem-name">{props.name}</div>
            <div className="AvailableItem-description">{props.description}</div>
            <div className="AvailableItem__idContainer">
                #<span className="AvailableItem-id">{props.id}</span>
            </div>
            <hr />
            <div>
                Items available: <span className="AvailableItem-count">{props.count}</span>
            </div>
        </div>
    );
}

AvailableItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired
};

export default AvailableItem;
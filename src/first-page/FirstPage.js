import * as React from 'react';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import AvailableItem from '../components/available-item/AvailableItem';

class FirstPage extends React.Component {
    render() {
        return (
            <div className="FirstPage">
                {this.props.loading ? <Loading/> : this.renderAvaibleItems()}
            </div>
        );
    }

    renderAvaibleItems() {
        return (
            <ul className="FirstPage__availableItems">
                {this.props.availableItems.map(i => (
                    <li key={i.id}>
                        <AvailableItem {...i}/>
                    </li>
                ))}
            </ul>
        );
    }
}

FirstPage.propTypes = {
    availableItems: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const appState = state.application;

    return {
        availableItems: appState.availableItems,
        loading: appState.loading
    };
};

export default connect(mapStateToProps)(FirstPage);
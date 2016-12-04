import * as React from 'react';
import {Link} from 'react-router';
import './App.css';
import {connect} from 'react-redux';
import {loadAvailableItems} from './actions';

class App extends React.Component {
  render() {
    return (
      <div className="Application">
        <header>
          <Link to="/">Home</Link>
        </header>
        <section>
          {this.props.children}
        </section>
        <footer>
          &copy; Sergey Kaikin
        </footer>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(loadAvailableItems());
  }
}

export default connect()(App);

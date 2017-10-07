// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'proptypes';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header 
            loading={this.props.loading}
            courseCount={this.props.courseCount}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  courseCount: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        courseCount: state.courses.length
    };
}

export default connect(mapStateToProps)(App);
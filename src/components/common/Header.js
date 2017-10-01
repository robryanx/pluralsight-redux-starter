import React from 'react';
import PropTypes from 'proptypes';
import { Link, IndexLink } from 'react-router';
import { LoadingDots } from './LoadingDots';

const Header = (props) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {props.loading && <LoadingDots dots={20} interval={100} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool
};

export default Header;
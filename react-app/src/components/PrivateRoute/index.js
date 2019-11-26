import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import storage from '../../storage';

const { getItem } = storage('cookieStorage');

const redirect = path => <Redirect to={{ pathname: path }} />;

const PrivateRoute = ({ component: Component, redirectPath = '/login', publicRoute, publicRedirect, ...rest }) => {
  if (publicRoute) {
    return (
      <Route
        {...rest}
        render={props => (
          getItem('token') ? redirect(publicRedirect) : <Component {...props} />
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props => (
        getItem('token') ? <Component {...props} /> : redirect(redirectPath)
      )}
    />
  );
};

PrivateRoute.defaultProps = {
  publicRedirect: '/',
  publicRoute: false,
  redirectPath: '/',
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  publicRedirect: PropTypes.string,
  publicRoute: PropTypes.bool,
  redirectPath: PropTypes.string,
};

export default PrivateRoute;

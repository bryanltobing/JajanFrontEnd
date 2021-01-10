import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { readCookie } from 'helpers/cookies';

class PublicRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const accessToken = readCookie('authToken');
    return (
      <Route
        {...rest}
        render={(props) => {
          if (accessToken) {
            return (
              <Redirect
                to={{ pathname: '/', state: { from: props.location } }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        }}
      />
    );
  }
}

export default PublicRoute;

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { readCookie } from 'helpers/cookies'

class VerifiedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props
    const accessToken = readCookie('authToken')
    return (
      <Route
        {...rest}
        render={(props) => {
          if (accessToken) {
            return (
              <>
                <Component {...props} />
              </>
            )
          } else {
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            )
          }
        }}
      />
    )
  }
}

export default VerifiedRoute

import loadable from '@loadable/component'
import { Switch, Route, Link } from 'react-router-dom'

import React from 'react'
import { Button, LinearProgress } from '@material-ui/core'

const SignUpPages = loadable(() => import('Components/SignUp/SignUp'), {
  fallback: <LinearProgress />,
})

const LoginPages = loadable(() => import('Components/SignIn/SignIn'), {
  fallback: <LinearProgress />,
})

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Link to="/register">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
        )}
      />
      <Route exact path="/register" component={SignUpPages} />
      <Route exact path="/login" component={LoginPages} />
    </Switch>
  )
}

export default Routes

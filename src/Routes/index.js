import loadable from '@loadable/component'
import { Switch } from 'react-router-dom'

import React from 'react'
import { Button, LinearProgress } from '@material-ui/core'
import PublicRoute from './PublicRoute'
import VerifiedRoute from './VerifiedRoute'
import history from 'helpers/history'
import { eraseCookie } from 'helpers/cookies'
import PhoneLogin from 'Components/PhoneLogin'

const SignUpPages = loadable(() => import('Components/SignUp/SignUp'), {
  fallback: <LinearProgress />,
})

const LoginPages = loadable(() => import('Components/SignIn/SignIn'), {
  fallback: <LinearProgress />,
})

const PhoneVerifyPages = loadable(
  () => import('Components/PhoneVerify/PhoneVerify'),
  {
    fallback: <LinearProgress />,
  }
)

const Routes = () => {
  return (
    <Switch>
      <VerifiedRoute
        exact
        path="/"
        component={() => (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              history.push('/login')
              eraseCookie('authToken')
            }}
          >
            Logout
          </Button>
        )}
      />
      <PublicRoute exact path="/register" component={SignUpPages} />
      <PublicRoute exact path="/login" component={LoginPages} />
      <PublicRoute
        exact
        path="/phone-verify/:phoneNumber"
        component={PhoneVerifyPages}
      />
      <PublicRoute exact path="/phone" component={PhoneLogin} />
    </Switch>
  )
}

export default Routes

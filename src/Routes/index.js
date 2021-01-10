import loadable from '@loadable/component'
import { Switch } from 'react-router-dom'

import React from 'react'
import { LinearProgress } from '@material-ui/core'
import PublicRoute from './PublicRoute'
import VerifiedRoute from './VerifiedRoute'

const DashboardPages = loadable(
  () => import('Components/Dashboard/Dashboard'),
  {
    fallback: <LinearProgress />,
  }
)
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

const AddProductPages = loadable(
  () => import('Components/AddProduct/AddProduct'),
  {
    fallback: <LinearProgress />,
  }
)

const ProductPages = loadable(() => import('Components/Products/Products'), {
  fallback: <LinearProgress />,
})

const PaymentPages = loadable(() => import('Components/Payments/Payments'), {
  fallback: <LinearProgress />,
})

const Routes = () => {
  return (
    <Switch>
      <VerifiedRoute exact path="/" component={DashboardPages} />
      <VerifiedRoute exact path="/add-product" component={AddProductPages} />
      <VerifiedRoute exact path="/products" component={ProductPages} />
      <VerifiedRoute exact path="/payments" component={PaymentPages} />
      <PublicRoute exact path="/register" component={SignUpPages} />
      <PublicRoute exact path="/login" component={LoginPages} />
      <PublicRoute
        exact
        path="/phone-verify/:phoneNumber"
        component={PhoneVerifyPages}
      />
    </Switch>
  )
}

export default Routes

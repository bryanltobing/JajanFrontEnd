import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { readCookie } from 'helpers/cookies'
import MainNavbarTop from 'Components/Navigation/MainNavbarTop'
import { CssBaseline, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const VerifiedRoute = (props) => {
  const classes = useStyles()

  const { component: Component, ...rest } = props
  const accessToken = readCookie('authToken')
  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) {
          return (
            <div className={classes.root}>
              <CssBaseline />
              <MainNavbarTop />
              <div className={classes.content}>
                <Component {...props} />
              </div>
            </div>
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

export default VerifiedRoute

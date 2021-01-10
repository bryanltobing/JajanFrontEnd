import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import MUILink from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import burgerLogo from 'assets/img/logo.png'
import { isEmpty, isEmptyNotValidForm } from 'helpers/validator'
import jajanRequest from 'Apis/Jajan'
import { createCookie } from 'helpers/cookies'
import { Backdrop, CircularProgress, Fade } from '@material-ui/core'
import history from 'helpers/history'
import jwtDecode from 'jwt-decode'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit">
        {' '}
        Jajan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function SignIn(props) {
  const classes = useStyles()

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (props.history.location?.state?.registerSuccessMessage) {
      setAlertOpen(true)
      setAlertMessage(props.history.location?.state?.registerSuccessMessage)
    }

    document.title = 'Login'

    return () => {
      setAlertOpen(false)
      setAlertMessage('')
    }
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setSubmitting(true)

    if (isEmptyNotValidForm([email, password])) {
      return false
    }

    try {
      setIsLoading(true)
      const response = await jajanRequest.post('/login', {
        email: email,
        hashPassword: password,
      })
      const token = response.data?.token
      const tokenDecoced = jwtDecode(response.data?.token)

      if (!tokenDecoced.isPhoneVerify) {
        history.push({
          pathname: '/phone-verify/+' + tokenDecoced.noTelp,
          state: {
            registerSuccessMessage: 'Register Successfully',
            userId: tokenDecoced._id,
          },
        })
        console.log(tokenDecoced)
      } else {
        if (rememberMe) {
          createCookie('authToken', token, 7)
        } else {
          createCookie('authToken', token)
        }
        history.push('/')
      }

      setIsLoading(false)
    } catch (err) {
      setError(true)
      setErrorMessage(err.response?.data?.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      {error && (
        <Fade in={error}>
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        </Fade>
      )}
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                if (
                  history.location &&
                  history.location.state &&
                  history.location.state.registerSuccessMessage
                ) {
                  const state = { ...history.location.state }
                  delete state.from
                  history.replace({ ...history.location, state })
                }
                setAlertOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img
              src={burgerLogo}
              style={{ width: '100%', backgroundColor: 'white' }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={submitting && isEmpty(email)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(evt) => setEmail(evt.target.value?.toLowerCase())}
              value={email}
              helperText={submitting && isEmpty(email) && 'Email is required'}
            />
            <TextField
              error={submitting && isEmpty(password)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(evt) => setPassword(evt.target.value)}
              value={password}
              helperText={
                submitting && isEmpty(password) && 'Pasword is required'
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  color="primary"
                  onChange={(evt) => setRememberMe(evt.target.checked)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MUILink href="#" variant="body2">
                  Forgot password?
                </MUILink>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

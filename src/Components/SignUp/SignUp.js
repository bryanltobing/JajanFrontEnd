import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { isEmpty, isEmptyNotValidForm } from 'helpers/validator'
import jajanRequest from 'Apis/Jajan'
import Alert from '@material-ui/lab/Alert'
import history from 'helpers/history'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">Jajan.com</Link>
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const [birthDate, setBirthDate] = useState(new Date('2020-08-18T21:11:54'))
  const [hashedPassword, setHashedPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setSubmitting(true)

    if (
      isEmptyNotValidForm([
        firstName,
        lastName,
        email,
        address,
        noTelp,
        birthDate,
        hashedPassword,
      ])
    ) {
      setFormValid(false)
    } else {
      try {
        setIsLoading(true)
        const response = await jajanRequest.post('/auth/register', {
          name: firstName + ' ' + lastName,
          email: email,
          hashPassword: hashedPassword,
          noTelp: noTelp,
          address: address,
        })
        setFormValid(true)
        setError(false)
        setErrorMessage('')
        setIsLoading(false)

        history.push({
          pathname: '/login',
          state: {
            registerSuccessMessage: response.data?.message,
          },
        })
      } catch (err) {
        setIsLoading(false)
        setFormValid(false)
        setError(true)
        setErrorMessage(err.response?.data?.message)
      }
    }
  }

  return (
    <>
      {error && (
        <Fade in={!formValid}>
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        </Fade>
      )}

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={submitting && isEmpty(firstName)}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(evt) => setFirstName(evt.target.value)}
                  helperText={submitting && isEmpty(firstName) && 'Required'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={submitting && isEmpty(lastName)}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={(evt) => setLastName(evt.target.value)}
                  helperText={submitting && isEmpty(lastName) && 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={submitting && isEmpty(email)}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  helperText={submitting && isEmpty(email) && 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={submitting && isEmpty(address)}
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(evt) => setAddress(evt.target.value)}
                  helperText={submitting && isEmpty(address) && 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={submitting && isEmpty(noTelp)}
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={noTelp}
                  onChange={(evt) => setNoTelp(evt.target.value)}
                  helperText={submitting && isEmpty(noTelp) && 'Required'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={submitting && isEmpty(hashedPassword)}
                  variant="outlined"
                  required
                  fullWidth
                  name="hashPassword"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={hashedPassword}
                  onChange={(evt) => setHashedPassword(evt.target.value)}
                  helperText={
                    submitting && isEmpty(hashedPassword) && 'Required'
                  }
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    error={submitting && isEmpty(birthDate)}
                    variant="outlined"
                    fullWidth
                    id="birthDate"
                    label="BirthDate"
                    format="MM/dd/yyyy"
                    value={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    helperText={submitting && isEmpty(birthDate) && 'Required'}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      checked
                      readOnly
                    />
                  }
                  label="I hereby agree with the applicable Terms of Use."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Fade,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import burgerLogo from 'assets/img/logo.png'
import { isEmpty } from 'helpers/validator'
import firebase from '../../firebaseConfig'
import jajanRequest from 'Apis/Jajan'
import history from 'helpers/history'
import Alert from '@material-ui/lab/Alert'

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

const PhoneVerify = (props) => {
  const classes = useStyles()

  const [submitting, setSubmitting] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!props.location?.state) {
      history.push('/login')
      return
    } else if (!props.location?.state?.userId) {
      history.push('/login')
      return
    }
    setisLoading(true)
    setUpRecaptcha()
    let phoneNumber = props.match?.params?.phoneNumber
    console.log(phoneNumber)
    let appVerifier = window.recaptchaVerifier
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        // console.log(confirmationResult);
        console.log('OTP is sent')
        setisLoading(false)
        setError(false)
      })
      .catch(function (error) {
        setisLoading(false)
        setError(true)
        setErrorMessage(error?.code)
      })
  }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)

    setisLoading(true)

    let otpInput = otp
    let optConfirm = window.confirmationResult

    if (props.location?.state.userId) {
      optConfirm
        .confirm(otpInput)
        .then(function (result) {
          // User signed in successfully.
          // console.log("Result" + result.verificationID);
          let user = result.user

          jajanRequest
            .post('/verification', {
              idUser: props.location?.state.userId,
            })
            .then((response) => {
              history.push({
                pathname: '/login',
                state: {
                  registerSuccessMessage:
                    props.location?.state.registerSuccessMessage,
                },
              })
            })
            .catch((err) => {
              setisLoading(false)
              console.log(err)
              console.log(err?.response?.data?.message)
            })

          console.log(user)
          console.log('success')
          setisLoading(false)
        })
        .catch(function (error) {
          console.log(error)
          setisLoading(false)
          alert('Incorrect OTP')
        })
    } else {
      console.log('no id')
      setisLoading(false)
    }
  }

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          console.log('Captcha Resolved')
          handleSubmit()
        },
        defaultCountry: 'ID',
      }
    )
  }

  return (
    <>
      {error && (
        <Fade in={true}>
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
            <img
              src={burgerLogo}
              style={{ width: '100%', backgroundColor: 'white' }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Phone Verification
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={submitting && isEmpty(otp)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Verification code"
              name="otp"
              autoComplete="otp"
              autoFocus
              onChange={(evt) => setOtp(evt.target.value)}
              value={otp}
              helperText={submitting && isEmpty(otp) && 'Otp is required'}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Verify
            </Button>
            <div id="recaptcha-container"></div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default PhoneVerify

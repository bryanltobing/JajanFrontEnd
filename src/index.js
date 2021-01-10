import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Router } from 'react-router-dom'
import App from './App'
import theme from './theme'
import history from 'helpers/history'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Router>,
  document.querySelector('#root')
)

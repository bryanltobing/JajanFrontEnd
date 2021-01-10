import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import jajanRequest from 'Apis/Jajan'
import { readCookie } from 'helpers/cookies'
import { isEmpty, isEmptyNotValidForm } from 'helpers/validator'
import React, { useState } from 'react'
import history from 'helpers/history'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const AddProduct = (props) => {
  const classes = useStyles()
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const [error, setError] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)

    if (isEmptyNotValidForm([productName, productPrice, productImageUrl])) {
      return false
    } else {
      setIsLoading(true)
      jajanRequest
        .post(
          '/admin/product',
          {
            nameProduct: productName,
            priceProduct: productPrice,
            imgPath: productImageUrl,
          },
          {
            headers: {
              Authorization: `JWT ${readCookie('authToken')}`,
            },
          }
        )
        .then((response) => {
          setIsLoading(false)
          history.push({
            pathname: '/products',
            state: {
              message: 'Product Added Successfully',
            },
          })
        })
        .catch((err) => {
          setIsLoading(false)
          setError(err.response.data)
        })
    }
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box my={4}>
        <Container
          component="main"
          maxWidth={'xl'}
          style={{ padding: '20px 0' }}
        >
          <Typography variant="h4">Add Product</Typography>

          {error && <div>{error}</div>}
          <Box my={4}>
            <form onSubmit={handleSubmit}>
              <Box my={2}>
                <TextField
                  error={submitting && isEmpty(productName)}
                  helperText={
                    submitting &&
                    isEmpty(productName) &&
                    'Product name is required'
                  }
                  variant="standard"
                  autoFocus
                  placeholder="Product Name"
                  fullWidth
                  name="nameProduct"
                  value={productName}
                  onChange={(evt) => setProductName(evt.target.value)}
                />
              </Box>
              <Box my={2}>
                <TextField
                  error={submitting && isEmpty(productPrice)}
                  helperText={
                    submitting &&
                    isEmpty(productPrice) &&
                    'Product price is required'
                  }
                  variant="standard"
                  placeholder="Price (IDR)"
                  fullWidth
                  name="priceProduct"
                  value={productPrice}
                  onChange={(evt) => setProductPrice(evt.target.value)}
                />
              </Box>
              <Box my={2}>
                <TextField
                  error={submitting && isEmpty(productImageUrl)}
                  helperText={
                    submitting &&
                    isEmpty(productImageUrl) &&
                    'Product image url is required'
                  }
                  variant="standard"
                  placeholder="Image URL"
                  fullWidth
                  name="imgUrl"
                  value={productImageUrl}
                  onChange={(evt) => setProductImageUrl(evt.target.value)}
                />
              </Box>
              <Box my={2}>
                <Button variant="contained" color="secondary" type="submit">
                  Add Product
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default AddProduct

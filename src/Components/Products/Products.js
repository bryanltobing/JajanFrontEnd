import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import jajanRequest from 'Apis/Jajan'
import { readCookie } from 'helpers/cookies'
import { CircularProgress } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import jwtDecode from 'jwt-decode'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Jajan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Products() {
  const [products, setProducts] = useState([])
  const userInfo = jwtDecode(readCookie('authToken'))
  useEffect(() => {
    jajanRequest
      .get('/admin/product', {
        headers: { Authorization: `JWT ${readCookie('authToken')}` },
      })
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])
  const classes = useStyles()

  const addToKeranjang = async (idUser, idProduct, qty = 1) => {
    try {
      const response = jajanRequest.post(
        '/keranjang',
        {
          idUser,
          listProduct: [
            {
              idProduct,
              qty,
            },
          ],
        },
        {
          headers: {
            Authorization: `JWT ${readCookie('authToken')}`,
          },
        }
      )
      console.log(response.data)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Jajan Products
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Nothing will benefit human health and increase chances for
              survival of life on Earth as much as the evolution to a vegetarian
              diet
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product, card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.imgPath}
                    title={product.nameProduct}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.nameProduct}
                    </Typography>
                    <Typography>This is a good stuff tough</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      IDR {product.priceProduct}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToKeranjang(userInfo._id, product._id)}
                    >
                      Add to keranjang
                      <AddShoppingCartIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Jajan APPS
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Never Surrender
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

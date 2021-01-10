import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import { Box, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

export default function MiniDrawer() {
  const classes = useStyles()

  return (
    <main>
      <div className={classes.toolbar} />
      <Typography variant="h5">
        Aplikasi Jajan adalah aplikasi yang dapat memudahkan kamu dalam mencari
        barang barang menarik dengan harga yang fantastis
      </Typography>
      <Box my={2}>
        <Typography paragraph>
          Jangan Ragu Menggunakan Aplikasi kami Lihat product product kami
          sekarang
        </Typography>
      </Box>
      <Typography paragraph>
        Ada banyak barang barang menarik yang menunggu anda sekarang
      </Typography>
      <Box my={2}>
        <Link to="/products">
          <Button variant="contained" color="secondary">
            Lihat Product
          </Button>
        </Link>
      </Box>
    </main>
  )
}

import { Box, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import jajanRequest from 'Apis/Jajan'
import { readCookie } from 'helpers/cookies'
import React, { useEffect, useState } from 'react'

const Keranjang = () => {
  const [keranjang, setKeranjang] = useState([])
  useEffect(() => {
    jajanRequest
      .get('/keranjang', {
        headers: {
          Authorization: `JWT ${readCookie('authToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setKeranjang(response.data)
      })
      .catch((err) => {
        alert(err)
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Box my={6}>
        <Typography variant={'h3'}>Keranjang pages</Typography>
      </Box>
      {keranjang.length < 1 && (
        <Alert severity="warning">Keranjang is empty</Alert>
      )}
    </div>
  )
}

export default Keranjang

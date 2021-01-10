import React from 'react'
import AppBarNav from './AppBarNav'
import DrawerNav from './DrawerNav'

const MainNavbarTop = () => {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <>
      <AppBarNav handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerNav handleDrawerClose={handleDrawerClose} open={open} />
    </>
  )
}

export default MainNavbarTop

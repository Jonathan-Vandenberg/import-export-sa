import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ChairIcon from '@mui/icons-material/Chair'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Router from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import FormSelector from './decor/category-selector'
import {
  setAbout,
  setAddress,
  setDetailDisplay,
  setEmail,
  setName,
  setPhoneNumber,
  setProducts,
  setSingleImages,
  setSingleUrl
} from './decor/slices/detailsSlice'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const drawer: { text: string; icon: ReactJSXElement; onClick: () => {} }[] = [
  {
    text: 'Vaccinacation News',
    icon: <InboxIcon />,
    onClick: () => Router.push('/vaccination-news')
  },
  {
    text: 'Decor Search',
    icon: <ChairIcon />,
    onClick: () => Router.push('/decor')
  }
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

interface Props {
  children: React.ReactNode
}

export default function PersistentDrawerLeft(props: Props) {
  const dispatch = useDispatch()
  const detailDisplay = useSelector(
    (state: RootState) => state.details.detailDisplay
  )

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleBackClick = () => {
    dispatch(setDetailDisplay(false))
    dispatch(setAbout(''))
    dispatch(setProducts([]))
    dispatch(setSingleImages([]))
    dispatch(setPhoneNumber(''))
    dispatch(setName(''))
    dispatch(setEmail(''))
    dispatch(setSingleUrl(''))
    dispatch(setAddress(''))
  }

  return (
    <Box sx={{ display: 'flex' }} maxWidth='sm'>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={open}
        style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            color='secondary'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {detailDisplay ? (
            <IconButton onClick={() => handleBackClick()}>
              <ArrowBackIosIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <FormSelector />
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  )
}

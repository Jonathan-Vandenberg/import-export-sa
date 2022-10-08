import React from 'react'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { nextPage, previousPage } from './slices/pageSlice'
import { Box, Container, Button, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { setDetailDisplay } from './slices/detailsSlice'
import { setClear, setInputValue } from './slices/categorySlice'

export default function PageSelection() {
  const page = useSelector((state: RootState) => state.page.page)
  const categoryUrls = useSelector(
    (state: RootState) => state.category.categoryUrls
  )
  const loading = useSelector((state: RootState) => state.category.loading)
  const images = useSelector((state: RootState) => state.category.images)
  const imageListDisplay = useSelector(
    (state: RootState) => state.category.imageListDisplay
  )
  const inputValue = useSelector(
    (state: RootState) => state.category.inputValue
  )

  const dispatch = useDispatch()

  // Next page handler
  const handleAddPage = () => {
    dispatch(nextPage())
    dispatch(setClear(true))
    dispatch(setDetailDisplay(false))
    dispatch(setInputValue(inputValue))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // handleSubmit;
  }

  //Previous page handler
  const handleSubtractPage = () => {
    dispatch(previousPage())
    dispatch(setClear(true))
    dispatch(setDetailDisplay(false))
    dispatch(setInputValue(inputValue))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // handleSubmit;
  }

  let imageCount = 0
  let businessWithImages = 0
  images.map((image) => {
    imageCount = imageCount + image.businessImages.length
    if (image.businessImages.length !== 0) {
      businessWithImages = businessWithImages + 1
    }
  })

  return (
    <>
      <Container
        maxWidth='xs'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          {page > 1 && (
            <Button
              onClick={handleSubtractPage}
              startIcon={<ChevronLeftIcon />}
              variant='outlined'
              color='success'
            >
              Previous
            </Button>
          )}
        </Box>
        <Box>
          {images.length === 25 && (
            <Button
              onClick={handleAddPage}
              endIcon={<ChevronRightIcon />}
              variant='outlined'
              color='success'
            >
              Next Page
            </Button>
          )}
        </Box>
      </Container>
      {<Typography>Page {page} </Typography>}
      {loading ? (
        <Typography>Loading images...</Typography>
      ) : (
        page >= 1 &&
        imageListDisplay &&
        images && (
          <Typography>
            ({imageCount} images from {businessWithImages} suppliers)
          </Typography>
        )
      )}
    </>
  )
}

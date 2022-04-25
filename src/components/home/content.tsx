import { Box, Container, Grid, Typography } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box padding={'1rem'}>
      <Container maxWidth="md">
        <Box><Typography fontSize={30} padding={'1rem'}>This is the title of the story.</Typography></Box>
        <Grid container spacing={3} padding={'1rem'}>
          <Grid item xs={12}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
          <Grid item xs={12}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
          <Grid item xs={12}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nesciunt assumenda magnam ducimus, nostrum eos ullam ad, est molestiae eaque quis nisi. Laborum voluptatibus itaque, modi possimus sapiente omnis dolorum?</Typography></Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={3} padding={'1rem'}>
          <Grid item xs={6}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
          <Grid item xs={12} padding={'1rem'}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
          <Grid item xs={6} padding={'1rem'}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
          <Grid item xs={6} borderLeft={'1px solid rgb(194,194,194)'}><Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum esse nostrum reprehenderit id, nam excepturi natus accusamus aspernatur magnam laudantium facilis itaque ut debitis consequatur eum. Odio et explicabo excepturi!</Typography></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
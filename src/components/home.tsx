import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { NextPage } from "next";
import FormSelector from "./decor/category-selector";
import PersistentDrawerLeft from "./side-drawer";

const Home: NextPage = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <PersistentDrawerLeft>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 1, opacity: 1, type: "spring" }}
          transition={{ duration: 3, delay: 7 }}
          style={{ width: "30vw" }}
        >
          <Typography variant="h2" fontFamily={"serif"} textAlign="left">
            Vietnamese Decor Suppliers
          </Typography>
          <FormSelector />
        </motion.div>
        <Container maxWidth="md"></Container>
      </PersistentDrawerLeft>
    </Container>
  );
};

export default Home;

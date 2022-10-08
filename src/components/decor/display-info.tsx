import { ImageList } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {
  Box,
  Button,
  Container,
  ImageListItem,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

// function rand() {
//   return Math.round(Math.random() * 20) - 10
// }

function getModalStyle() {
  const top = 50;
  const left = 50;
  const height = "600px";
  const width = "900px";
  const overflow = "hidden";
  const position = "relative";
  const objectFit = "contain";
  const overFlow = "hidden";

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: height,
    width: width,
    overflow: overflow,
    position: position,
    objectFit: objectFit,
    overFlow: overFlow,
    opacity: "transparent",
  };
}

const useStyles = makeStyles(
  (theme: {
    palette: { background: { paper: any } };
    shadows: any[];
    spacing: (arg0: number) => any;
  }) => ({
    paper: {
      position: "relative",
      width: 800,
      backgroundColor: "transparent",
      boxShadow: "rgb(0,0,0,0.2)",
      outline: "none",
    },
  })
);

const DisplayInfo: NextPage = () => {
  const [open, setOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);

  const name = useSelector((state: RootState) => state.details.name);
  const email = useSelector((state: RootState) => state.details.email);
  const singleUrl = useSelector((state: RootState) => state.details.singleUrl);
  const address = useSelector((state: RootState) => state.details.address);
  const about = useSelector((state: RootState) => state.details.about);
  const phoneNumber = useSelector(
    (state: RootState) => state.details.phoneNumber
  );
  const products = useSelector((state: RootState) => state.details.products);
  const singleImage = useSelector(
    (state: RootState) => state.details.singleImage
  );
  const singleImages = useSelector(
    (state: RootState) => state.details.singleImages
  );
  const loading = useSelector((state: RootState) => state.category.loading);

  const mapSearch = (address: string): void => {
    window.open(
      "https://www.google.com/maps/search/" +
        address
          .toString()
          .replace(/\s+/g, "+")
          .replace(/\/+/g, "%2F")
          .toLowerCase()
          .trim()
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Container style={{ marginTop: "3rem" }}>
      <Container maxWidth="sm">
        <Box
          style={{
            position: "relative",
            width: "600px",
            height: "400px",
            overflow: "hidden",
          }}
        >
          {singleImage && (
            <Image
              priority
              src={singleImage}
              alt="decor"
              layout="fill"
              objectFit="contain"
            />
          )}
        </Box>
      </Container>

      <Container>
        <Box paddingTop="1rem">
          {name && (
            <Box
              style={{
                borderBottom: "1px solid rgb(0,0,0,0.2)",
                padding: "1rem",
              }}
            >
              <Typography variant="h3">{name}</Typography>
            </Box>
          )}
        </Box>

        <Container style={{ paddingBottom: "2rem", marginLeft: "-1rem" }}>
          {singleUrl && (
            <Button
              startIcon={<LanguageIcon />}
              component="a"
              href={singleUrl}
              target="_blank"
              style={{ padding: "1rem" }}
              color="success"
            >
              Website
            </Button>
          )}

          {address && (
            <Button
              startIcon={<MyLocationIcon />}
              style={{ padding: "1rem" }}
              color="success"
              onClick={() => mapSearch(address)}
            >
              View Map
            </Button>
          )}

          {email && (
            <Button startIcon={<EmailIcon />} href={email} color="success">
              Email
            </Button>
          )}

          {/* {phoneNumber && (
            <Button startIcon={<CallIcon />} style={{ color: 'black' }}>
              {phoneNumber}
            </Button>
          )} */}
        </Container>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ borderRadius: "5px" }}
        >
          <Image
            src={`${modalImage}?w=248&fit=crop&auto=format`}
            alt={"product"}
            loading="lazy"
            layout="fill"
            objectFit="contain"
            onClick={handleClose}
          />
        </Modal>
        <Stack>
          <ImageList variant="masonry" cols={4}>
            {singleImages?.map((item) => (
              <ImageListItem
                key={item}
                style={{
                  position: "relative",
                  width: "260px",
                  height: "250px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`${item}?w=248&fit=crop&auto=format`}
                  alt={"product"}
                  loading="lazy"
                  layout="fill"
                  objectFit="cover"
                  onClick={() => {
                    setModalImage(item), handleOpen();
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>

        {about && (
          <Typography variant="h6" padding="2rem">
            {about}
          </Typography>
        )}

        {products.length > 0 && (
          <>
            <Typography
              variant="h5"
              style={{
                marginLeft: "3rem",
                borderTop: "double rgba(0, 0, 0, 0.5)",
                paddingTop: "2rem",
              }}
            >
              Products
            </Typography>
            <List style={{ listStyle: "initial" }}>
              {products.map((product: string) => (
                <ListItem key={product}>
                  <Typography variant="h6">{product}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </Container>
  );
};

export default DisplayInfo;

import { ImageList, ImageListItem, Skeleton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  setAbout,
  setAddress,
  setDetailDisplay,
  setEmail,
  setName,
  setPhoneNumber,
  setProducts,
  setSingleImage,
  setSingleImages,
  setSingleUrl,
} from "./slices/detailsSlice";

const ImageListDisplay: NextPage = () => {
  const images = useSelector((state: RootState) => state.category.images);
  const loading = useSelector((state: RootState) => state.category.loading);

  const dispatch = useDispatch();

  // Fetch details of selected product
  const singleDataHandler = async (url: string) => {
    try {
      console.log("Attempting fetch...");
      await fetch("/api/single-data-handler", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ searchQuery: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setSingleImages(data.singleImages));
          dispatch(setAddress(data.address));
          dispatch(setAbout(data.about));
          dispatch(setName(data.name));
          dispatch(setEmail(data.email));
          dispatch(setSingleUrl(data.website));
          dispatch(setPhoneNumber(data.phone));
          dispatch(setProducts(data.products));
        });
      dispatch(setDetailDisplay(true));
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack direction="row">
      <ImageList cols={3} style={{ width: "100%" }}>
        {images.map((item) =>
          item.businessImages.map((img, index) => (
            <ImageListItem key={item.urls + index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0.3, scale: 0.95 },
                }}
                style={{
                  position: "relative",
                  width: "350px",
                  height: "280px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`${img}?w=248&fit=crop&auto=format`}
                  alt={"product"}
                  loading="lazy"
                  layout="fill"
                  objectFit="cover"
                  onClick={() => {
                    dispatch(setSingleImage(img));
                    singleDataHandler(item.urls);
                  }}
                />
              </motion.div>
            </ImageListItem>
          ))
        )}
      </ImageList>
    </Stack>
  );
};

export default ImageListDisplay;

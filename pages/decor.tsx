import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../src/app/store";
import DisplayInfo from "../src/components/decor/display-info";
import ImageListDisplay from "../src/components/decor/image-list";
import PageSelection from "../src/components/decor/page";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default function Home() {
  const detailDisplay = useSelector(
    (state: RootState) => state.details.detailDisplay
  );
  const categoryUrls = useSelector(
    (state: RootState) => state.category.categoryUrls
  );
  const loading = useSelector((state: RootState) => state.category.loading);
  const imageListDisplay = useSelector(
    (state: RootState) => state.category.imageListDisplay
  );

  console.log('detailDisplay', detailDisplay)

  return (
    <Container maxWidth={"lg"}>
      <Head>
        <title>Decor Vietnam</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {detailDisplay ? <DisplayInfo /> : <ImageListDisplay />}
      {!detailDisplay && imageListDisplay && <PageSelection />}
    </Container>
  );
}

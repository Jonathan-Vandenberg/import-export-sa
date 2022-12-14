import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { categories } from "../../lib/categories";
import {
  setClear,
  setImageListDisplay,
  setImages,
  setInputValue,
  setLoading,
} from "./slices/categorySlice";
import { setDetailDisplay } from "./slices/detailsSlice";
import { setPage } from "./slices/pageSlice";

const FormSelector: NextPage = () => {
  const dispatch = useDispatch();

  const categoryUrls = useSelector(
    (state: RootState) => state.category.categoryUrls
  );

  const inputValue = useSelector(
    (state: RootState) => state.category.inputValue
  );
  const page = useSelector((state: RootState) => state.page.page);

  const images = useSelector((state: RootState) => state.category.images);

  const router = useRouter();

  const handleSubmit = () => {
    dispatch(setLoading(true));

    fetch("/api/category-business-url", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ searchQuery: inputValue, page: page }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.urlBusiness.forEach((url: string) => {
          fetch("/api/category-images", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ searchQuery: url, page: page }),
          })
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                setImages({
                  businessImages: data.businessImages,
                  urls: url,
                })
              );
            });
          dispatch(setImageListDisplay(true));
        })
      );
    dispatch(setLoading(false));
  };

  React.useEffect(() => {
    if (inputValue === "") {
      return;
    }
    return handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, page]);

  const handleSelectClick = () => {
    dispatch(setImageListDisplay(false));
    dispatch(setDetailDisplay(false));
    dispatch(setClear(true));
    dispatch(setPage(1));
    router.push("/decor");
  };

  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <FormControl fullWidth style={{ paddingTop: "1rem" }}>
        <InputLabel id="categories" variant="filled">
          Select Category
        </InputLabel>
        <Select
          labelId="categories"
          id="categories"
          label="categories"
          name="categories"
          onChange={(e) => {
            dispatch(setInputValue(e.target.value));
          }}
          value={inputValue}
          onClick={() => {
            handleSelectClick();
          }}
        >
          {categories.map((item, i) => (
            <MenuItem style={{ color: "black" }} key={i} value={item.url}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default FormSelector;

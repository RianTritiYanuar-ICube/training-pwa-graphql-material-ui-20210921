import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { LOAD_CATEGORIES } from "../graphql/queries";
import { Container, Grid, Box, Paper, Typography, Stack } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export default function Home() {
  /**
   * Init load categories query
   * 
   */
  const resCategories = useQuery(LOAD_CATEGORIES);

  /**
   * Some data from response
   * 
   */
  const loading = resCategories.loading
  const error = resCategories.error
  let categories = []

  /**
   * Check if we successfull get the data
   * 
   */
  if(resCategories.data){
    categories = resCategories.data.categoryList[0].children
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "10px 20px 10px 20px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const categoryList = () => {
    return (
      <>
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          sx={{ textAlign: "center" }}
        >
          Categories
        </Typography>

        {categories.map((category) => {
          return category.children.length ? (
            <Container
              maxWidth="xl"
              sx={{ padding: "10px 0px 30px 0px" }}
              key={category.id}
            >
              <Typography variant="h4" gutterBottom component="div">
                {category.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  "& > :not(style)": {
                    m: 1,
                    textAlign: "center",
                  },
                }}
              >
                {category.children.map((children) => (
                  <Link
                    key={children.id}
                    href={`/category/${children.url_key}`}
                  >
                    <a>
                      <Item>{children.name}</Item>
                    </a>
                  </Link>
                ))}
              </Box>
            </Container>
          ) : null;
        })}
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>HomePage</title>
      </Head>
      <Container maxWidth="lg">
        {loading ? <h3>Loading ...</h3> : categoryList()}
      </Container>
    </div>
  );
}

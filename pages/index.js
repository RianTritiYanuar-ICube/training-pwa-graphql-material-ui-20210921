import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { LOAD_CATEGORIES } from "../graphql/queries";
import { Container, Box, Paper, Typography } from '@mui/material';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const { error, loading, data } = useQuery(
    LOAD_CATEGORIES, {
      // fetchPolicy: 'no-cache',
      variables: {
        categoryListFilters: {
          url_key: {
            eq: "brands-corner"
          }
        }
      }
    }
  );

  const categoryList = () => {
    return(
      <>
        <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="h3" component="h2">
          Our Brands
        </Typography>
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
              textAlign: 'center'
            },
          }}>
          {categories.map(c => (
            <Paper elevation={3}>
              <Link key={c.id} href={"/category/" + c.id}>
                <a>
                  {c.image && <Image src={c.image} width={50} height={50} />}
                  <h4>{c.name}</h4>
                </a>
              </Link>
            </Paper>
          ))}
        </Box>
      </>
    )
  }

  useEffect(() => {
    if (data) {
      setCategories(data.categoryList[0].children)
      console.log(data.categoryList[0].children)
    }
    setIsLoading(loading);
  });

  return (
    <div>
      <Head>
        <title>HomePage</title>
      </Head>
      <Container maxWidth="lg">
        {isLoading ? (
          <h3>Loading ...</h3>
        ) : categoryList()}
      </Container>
    </div>
  );
}

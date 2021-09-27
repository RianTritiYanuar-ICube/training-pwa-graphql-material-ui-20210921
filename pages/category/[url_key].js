import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../../graphql/queries";
import { Container, Box, Card } from "@mui/material";

export default function Home() {
  /**
   * Route stuff
   * 
   */
  const router = useRouter();
  const url_key = router.query.url_key;

  /**
   * Init load products
   * 
   */
  const resProducts = useQuery(LOAD_PRODUCTS, {
    // fetchPolicy: 'no-cache',
    variables: {
      categoryListFilters: {
        url_key: {
          eq: url_key,
        },
      },
    },
  });

  /**
   * Response data
   * 
   */
  const loading = resProducts.loading
  const error = resProducts.error
  let products = []

  /**
   * Check if we successfull get the data
   * 
   */
  if(resProducts.data){
    products = resProducts.data.categoryList[0].products.items
  }

  const productList = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 256,
            height: 300,
            textAlign: "center",
          },
        }}
      >
        {products.map((p) => (
          <Card variant="outlined" key={p.id}>
            <Image src={p.image.url} width={150} height={150} />
            <Link href={"/product/" + p.url_key}>
              <a>
                <h4 style={{ marginLeft: "5px", marginRight: "5px" }}>
                  {p.name}
                </h4>
              </a>
            </Link>
            <h5>
              {p.price_range.maximum_price.final_price.value}{" "}
              {p.price_range.maximum_price.final_price.currency}
            </h5>
          </Card>
        ))}
      </Box>
    );
  };

  return (
    <div>
      <Head>
        <title>HomePage</title>
      </Head>
      <Container sx={{ justifyContent: "center" }} maxWidth={"lg"}>
        {loading ? <h3>Loading ...</h3> : productList()}
      </Container>
    </div>
  );
}

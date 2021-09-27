import React, { useState } from "react";
import parse from "html-react-parser";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_PRODUCT_DETAIL } from "../../graphql/queries";
import { CREATE_CART, ADD_TO_CART } from "../../graphql/mutations";
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Snackbar,
} from "@mui/material";

function Product() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  /**
   * Router stuff
   * 
   */
  const router = useRouter();
  const url_key = router.query.url_key;

  /**
   * Query get product detail
   *
   */
  const resProduct = useQuery(LOAD_PRODUCT_DETAIL, {
    // fetchPolicy: 'no-cache',
    variables: {
      productsFilter: {
        url_key: {
          eq: url_key,
        },
      },
    },
  });

  /**
   * Product data
   * 
   */
  const loading = resProduct.loading
  const error = resProduct.error
  let product = null

  /**
   * Check the data
   * 
   */
   if (resProduct.data) {
    product = resProduct.data.products.items[0]
  }

  /**
   * Add to cart mutation
   *
   */
  const [addToCart] = useMutation(ADD_TO_CART);

  /**
   * Create cart mutation
   *
   */
  const [createCart] = useMutation(CREATE_CART, {
    onCompleted: (v) => {
      return v;
    },
    onError: (e) => {
      console.log(e);
    },
  });

  /**
   * Handle add to cart
   *
   */
  const handleAddToCart = async () => {
    setIsProcessing(true);

    if (localStorage.getItem("cart_token") === null) {
      const res = await createCart();
      localStorage.setItem("cart_token", res.data.createEmptyCart);
    }

    addToCart({
      variables: {
        addSimpleProductsToCartInput: {
          cart_id: localStorage.getItem("cart_token"),
          cart_items: [
            {
              data: {
                quantity: quantity,
                sku: product.sku,
              },
              // customizable_options: [
              //   {
              //     id: null,
              //     value_string: null
              //   }
              // ]
            },
          ],
        },
      },
      update: (cache, data) => {
        localStorage.setItem(
          "cart",
          JSON.stringify(data.data.addSimpleProductsToCart.cart)
        );
        setIsProcessing(false);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  /**
   * Handle quantity button
   *
   */
  const handleQty = (type) => {
    if (type == "plus") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 ? setQuantity(quantity - 1) : null;
    }
  };

  const detailProduct = () => {
    return (
      <Container sx={{ marginTop: "15px" }} maxWidth="lg">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={toast}
          message="MASSUKK PAK EKOO!! Silahkan cek cart kamu yaa"
          key={1}
        />
        <Card variant="outlined" sx={{ padding: "10px" }}>
          <Box sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 450 }}
              image={product.image.url}
            />
            <CardContent>
              <Typography component="div" variant="h5">
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {product.price_range.maximum_price.final_price.value}{" "}
                {product.price_range.maximum_price.final_price.currency}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {parse(product.description.html)}
              </Typography>
            </CardContent>
          </Box>
          <Container maxWidth="md" sx={{ marginBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleQty("minus")}
                    fullWidth
                  >
                    -
                  </Button>
                  <Typography component="div" variant="h5">
                    {quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleQty("plus")}
                    fullWidth
                  >
                    +
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={
                    isProcessing
                      ? true
                      : product.stock_status == "IN_STOCK"
                      ? false
                      : true
                  }
                  fullWidth
                >
                  {product.stock_status == "IN_STOCK"
                    ? "Bungkus Ke Cart"
                    : "Stok Habis Nih"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </Container>
    );
  };

  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <div>{loading ? <h3>Loading ...</h3> : detailProduct()}</div>
    </div>
  );
}

export default Product;

import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
import Head from "next/head";
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client";
import { LOAD_CART_DETAIL } from "../../graphql/queries"
import { Container, Box, Card, CardMedia, CardContent, Typography, Button, IconButton, Grid } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material'

function Product() {
    const [cart, setCart] = useState([])
    const [cartToken, setCartToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Load cart detail query
     * 
     */
    const { error, loading, data } = useQuery(LOAD_CART_DETAIL, {
        // fetchPolicy: 'no-cache',
        variables: {
            cartCartId: cartToken
        }
    })

    const cartList = () => {
        return (
        <Container sx={{ marginTop: "15px" }} maxWidth="lg">
            {cart.items.map(c => (
                <Card variant="outlined" sx={{ padding: "10px", marginBottom: "15px" }} key={c.id}> 
                    <Box sx={{ display: 'flex' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8} sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150, height: 150 }}
                                    image={c.product.image.url}
                                />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography component="div" variant="h5">
                                        {c.product.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {c.quantity} x {c.product.price_range.maximum_price.final_price.value} {c.product.price_range.maximum_price.final_price.currency}
                                    </Typography>
                                    {/* <Box sx={{ display: 'flex', marginTop: '10px' }}>
                                        <Button variant="contained" size="small" sx={{ minWidth: '30px' }}>-</Button>
                                        <Typography component="h6" variant="h5" sx={{ marginLeft: '10px', marginRight: '10px' }}>2</Typography>
                                        <Button variant="contained" size="small" sx={{ minWidth: '30px' }}>+</Button>
                                    </Box> */}
                                </CardContent>
                            </Grid>
                            <Grid item xs={3} sx={{ alignSelf: 'center' }}>
                                <Typography component="div" variant="h5">
                                    {c.prices.row_total.value} {c.prices.row_total.currency}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ textAlign: 'center', alignSelf: 'center' }}>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Card>
            ))}
        </Container>
        )
    }

    useEffect(() => {
        if(data){
            setCart(data.cart)
            console.log(data.cart.prices.grand_total.value)
        }

        setCartToken(localStorage.getItem("cart_token"))
        setIsLoading(loading)
    })

    return (
        <div>
        <Head>
            <title>Cart</title>
        </Head>
        <Container sx={{ marginTop: "15px" }} maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="h4" component="h3">
                    Cart
                </Typography>
                <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="h4" component="h3">
                    {isLoading ? "Loading ..." : `${cart.prices.grand_total.value} ${cart.prices.grand_total.currency}`}
                </Typography>
            </Box>
            {isLoading ? <h4>Loading ...</h4> : cartList()}
        </Container>
        </div>
    );
}

export default Product

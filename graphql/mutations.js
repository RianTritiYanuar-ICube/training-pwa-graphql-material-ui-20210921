import { gql } from "@apollo/client";

export const CREATE_CART = gql`
    mutation Mutation {
        createEmptyCart
    }
`;

export const ADD_TO_CART = gql`
    mutation AddSimpleProductsToCartMutation($addSimpleProductsToCartInput: AddSimpleProductsToCartInput) {
        addSimpleProductsToCart(input: $addSimpleProductsToCartInput) {
            cart {
                items {
                    quantity
                    prices {
                        row_total {
                            value
                            currency
                        }
                        price {
                            currency
                            value
                        }
                    }
                    product {
                        id
                        name
                        sku
                    }
                }
            }
        }
    }
`;
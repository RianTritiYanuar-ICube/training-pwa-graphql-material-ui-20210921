import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation Mutation {
    createEmptyCart
  }
`;

export const ADD_TO_CART = gql`
  mutation AddSimpleProductsToCartMutation(
    $addSimpleProductsToCartInput: AddSimpleProductsToCartInput
  ) {
    addSimpleProductsToCart(input: $addSimpleProductsToCartInput) {
      cart {
        items {
          id
          quantity
          prices {
            row_total {
              currency
              value
            }
          }
          product {
            id
            name
            image {
              url
            }
            url_key
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
              }
            }
          }
        }
        prices {
          grand_total {
            currency
            value
          }
        }
      }
    }
  }
`;

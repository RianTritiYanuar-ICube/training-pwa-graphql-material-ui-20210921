import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
  query Query($categoryListFilters: CategoryFilterInput) {
    categoryList(filters: $categoryListFilters) {
      children {
        id
        name
        image
        children {
          id
          name
          image
        }
      }
    }
  }
`;

export const LOAD_PRODUCTS = gql`
  query Query($productsFilter: ProductAttributeFilterInput) {
    products(filter: $productsFilter) {
      items {
        id
        name
        url_key
        image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

export const LOAD_PRODUCT_DETAIL = gql`
  query Query($productsFilter: ProductAttributeFilterInput) {
    products(filter: $productsFilter) {
      items {
        id
        name
        sku
        stock_status
        image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
        }
        description {
          html
        }
      }
    }
  }
`;

export const LOAD_CART_DETAIL = gql`
  query Query($cartCartId: String!) {
    cart(cart_id: $cartCartId) {
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
`;

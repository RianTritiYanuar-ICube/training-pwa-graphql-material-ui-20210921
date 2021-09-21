import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Layout from "../components/Layout";

// Error message purpose
const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL Erorr ${message}`);
    });
  }
});

// Link endpoint HttpLink
// const link = from([
//   errorLink,
//   new HttpLink({ uri: "https://senheng-gql.testingnow.me/graphql" }),
// ]);

// Link endpoint creteHttpLink
const link = from([
  errorLink,
  new createHttpLink({ 
    uri: "https://senheng-gql.testingnow.me/graphql",
    credentials: 'same-origin',
  }),
]);

// Init client
const client = new ApolloClient({
  ssrMode: true,
  link: link,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;

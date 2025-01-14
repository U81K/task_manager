import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
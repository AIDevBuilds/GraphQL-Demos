import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";

const BASE_URL = 'http://192.168.0.100:4000'

const httpLink = new HttpLink({
    uri: BASE_URL
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default client
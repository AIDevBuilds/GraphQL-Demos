import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL = 'http://' // https://
const WS_URL = 'ws://' // wss://
const DEV_URL = '192.168.0.100:4000/graphql'


const httpLink = new HttpLink({
    uri: `${HTTP_URL}${DEV_URL}`
})

const wsLink = new WebSocketLink({
    uri: `${WS_URL}${DEV_URL}`
})

// using the ability to split links
// depending on the operation type,
// send data to each link
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    split,
    ApolloLink,
    Observable
} from "@apollo/client";

import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.100:4000/graphql'

const httpLink = new HttpLink({
    uri: BASE_URL,
    credentials: 'include'
})


const request = async (operation) => {
    const token = await AsyncStorage.getItem('token');
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });
};

// add observer to each request
// forward operations with existing context
// applies middleware, credentials (express)
const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
        let handle;
        Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));

        return () => {
            if (handle) handle.unsubscribe();
        };
    })
);

// ApolloLink allows multiple links
const client = new ApolloClient({
    link: ApolloLink.from([requestLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client
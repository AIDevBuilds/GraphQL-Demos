import React from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import Coin from '../components/Coin'


const FAVORITES = gql`
query Bitcoins {
    favorite{
        name
        symbol
        price
        imageUrl
        favorite
    }
}
`

export default function LinkScreen({ navigation }) {

    const { data, error } = useQuery(FAVORITES)

    if (!data || !data.favorite || error) {
        console.log(error)
        return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={data.favorite}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) =>
                    <Coin coin={item} onPress={() => navigation.navigate('Detail', { coin: item })} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616'
    },
    contentContainer: {
        paddingTop: 10,
        paddingBottom: 10
    }
})
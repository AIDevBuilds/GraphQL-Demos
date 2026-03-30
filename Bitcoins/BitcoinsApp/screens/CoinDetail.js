import React from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, Text, Image, FlatList } from "react-native";
import RoundedButton from '../components/RoundedButton'
import { useQuery, useMutation, gql } from "@apollo/client";
import Coin from "../components/Coin";

//Queries
const FETCH_FAVORITE = gql`
query Bitcoins{
    favorite {
      name
      symbol
      price
      imageUrl
      favorite
    }
  }
`
// Mutations
const ADD_COIN = gql`
    mutation AddCoin($symbol: String!) {
        addCoin(symbol: $symbol){
            name
            symbol
            price
            imageUrl
            favorite
        }
    }
`
const REMOVE_COIN = gql`
    mutation RemoveCoin($symbol: String!) {
        removeCoin(symbol: $symbol){
            name
            symbol
            price
            favorite
        }
    }
`

export default function CoinDetail({ navigation, route }) {

    const { data, refetch } = useQuery(FETCH_FAVORITE)
    const [addCoin] = useMutation(ADD_COIN)
    const [removeCoin] = useMutation(REMOVE_COIN)

    const { coin } = route.params
    const { symbol, name, price, imageUrl } = coin

    const isFavorite = data && data.favorite && data.favorite.find(coin => coin.symbol == symbol)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <Text style={styles.text} numberOfLines={1}>
                    {name} - {symbol}
                </Text>
                <RoundedButton
                    backgroundColor="skyblue"
                    text={isFavorite ? `Remove ${name}` : `Save ${name}`}
                    onPress={() => {
                        if (isFavorite) {
                            removeCoin({
                                variables: { symbol }
                            }).then(() => refetch())
                                .catch(err => console.log(err))
                        } else {
                            addCoin({
                                variables: { symbol }
                            }).then(() => refetch())
                                .catch(err => console.log(err))
                        }
                    }} />
            </View>

            <View style={styles.statRow}>
                <Text style={styles.text}>Price</Text>
                <Text style={styles.text}>{price}</Text>
            </View>
            <View style={styles.statsContainer}>
                {!!data && !!data.favorite && (
                    <FlatList
                        data={data.favorite}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) =>
                            <Coin coin={item}
                                onPress={() => navigation.navigate('Detail', { coin: item })} />
                        }
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        color: '#161616'
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'cover'
    },
    statsContainer: {
        flex: 62,
        backgroundColor: '#161616'
    },
    statRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    stat: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    }
})
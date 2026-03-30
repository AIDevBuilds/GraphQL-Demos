import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import MoviePoster from '../component/MoviePoster';
import Tag from '../component/Tag';

const FEED_QUERY = gql`
    query Feed($categoryId: ID) {
        feed(categoryId: $categoryId) {
            id
            title
            description
            category {
                id
                title
            }
            imageUrl
        }
    }
`

const CATEGORY_QUERY = gql`
    query {
        categories {
            id
            title
        }
    }
`

export default function HomeScreen(props) {

    const [categoryId, setCategoryId] = useState(0)

    const { data, refetch, error, loading } = useQuery(FEED_QUERY, {
        variables: categoryId ? { categoryId } : {},
        fetchPolicy: 'cache-and-network'
    })

    const { data: genres } = useQuery(CATEGORY_QUERY);

    const { navigation } = props;

    if (error) {
        return <Text>{error.message}</Text>
    }

    if (loading || !data || !data.feed) {
        return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />
    }

    return (
        <View style={styles.container}>
            {genres ? <FlatList
                data={genres.categories}
                horizontal
                keyExtractor={(item, index) => {
                    return `${index}`;
                }}
                extraData={categoryId}
                style={styles.bottomBorder}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const selected = categoryId == item.id;
                    return (
                        <Tag key={index} selected={selected} title={item.title}
                            onPress={() => {
                                if (selected) {
                                    setCategoryId(0)
                                    refetch()
                                } else {
                                    setCategoryId(parseInt(item.id))
                                    refetch()
                                }
                            }} />
                    )
                }}
            />
                : null}
            <FlatList
                data={data.feed}
                keyExtractor={(itemObj, index) => {
                    return `${index}`;
                }}
                numColumns={2}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                renderItem={({ item, index }) => {
                    return (
                        <MoviePoster movie={item} onPress={() => navigation.navigate('Movie', { movie: item })} />
                    )
                }}
            />
        </View>
    );
}

HomeScreen.navigationOptions = {
    title: 'Now Playing',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingTop: 10,
    },
    bottomBorder: {
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});
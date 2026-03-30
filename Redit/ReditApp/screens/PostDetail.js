import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions, Linking } from 'react-native'
import RoundedButton from '../components/RoundedButton'
import { useMutation, gql } from '@apollo/client'

const { width } = Dimensions.get('window')


//Delete Post Mutation
const DELETE_POST = gql`
    mutation DeletePost($id: ID!){
        deletePost(id: $id)
    }
`

export default function PostDetail({ route, navigation }) {

    const { params } = route
    const { post } = params
    const { id, title, link, imageUrl } = post

    const [deletePost] = useMutation(DELETE_POST)

    return (
        <View style={styles.container}>
            {!!imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{title}</Text>
            <RoundedButton
                text={link}
                textColor='white'
                backgroundColor="rgb(75, 148, 214)"
                onPress={() => {
                    Linking.openURL(link)
                        .catch((err) => console.log(err))
                }}
            />
            <RoundedButton
                text="Edit"
                textColor='white'
                backgroundColor="#a9a9a9"
                onPress={() => {
                    navigation.navigate("PostForm", { post: post })
                }}
            />
            <RoundedButton
                text="Delete"
                textColor='white'
                backgroundColor="#FA8072"
                onPress={() => {
                    deletePost({ variables: { id: id } })
                        .then(() => navigation.goBack())
                        .catch(err => console.log(err))
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    text: {
        fontSize: 32,
        color: '#161616',
        padding: 15
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'cover'
    },
    saveIcon: {
        position: 'relative',
        left: 20,
        zIndex: 8
    }
})
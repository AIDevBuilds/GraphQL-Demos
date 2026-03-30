import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimension, TextInput, Alert, Dimensions } from 'react-native'
import RoundedButton from '../components/RoundedButton'
import { useMutation, gql } from '@apollo/client'

const { width } = Dimensions.get('window')

const ADD_POST = gql`
    mutation AddPost($title: String!, $link: String!, $imageUrl: String!) {
        addPost(title: $title, link: $link, imageUrl: $imageUrl)
    }
`

const EDIT_POST = gql`
    mutation AddPost($id:ID!, $title: String!, $link: String!, $imageUrl: String!) {
        editPost(id:$id, title: $title, link: $link, imageUrl: $imageUrl){
            id
            title
            link
            imageUrl
        }
    }
`

export default function PostForm({ route, navigation }) {
    const [addPost] = useMutation(ADD_POST)
    const [editPost] = useMutation(EDIT_POST)
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [id, setID] = useState('')

    const { post } = route.params

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setLink(post.link)
            setImageUrl(post.imageUrl)
            setID(post.id)
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View>
                    <Text>Title</Text>
                    <TextInput
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder="Title"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.input}
                        autoFocus
                    />
                </View>
                <View>
                    <Text>Link</Text>
                    <TextInput
                        onChangeText={text => setLink(text)}
                        value={link}
                        placeholder="Link"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text>Image Url</Text>
                    <TextInput
                        onChangeText={text => setImageUrl(text)}
                        value={imageUrl}
                        placeholder="Image Url"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
            </View>
            <RoundedButton
                text={post == undefined ? "Create Post" : "Edit Post"}
                textColor="#fff"
                backgroundColor="rgb(75,148,214)"
                onPress={() => {
                    if (post) {
                        editPost({ variables: { id, title, link, imageUrl } })
                            .then(() => navigation.goBack())
                            .catch(err => console.log(err))
                    } else {
                        addPost({ variables: { title, link, imageUrl } })
                            .then(() => navigation.goBack())
                            .catch(err => console.log(err))
                    }

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
    inputContainer: {
        flex: 0.4,
        justifyContent: 'space-around'
    },
    input: {
        width: width,
        height: 40,
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    image: {
        width,
        height: width,
        resizeMode: 'cover'
    }
})
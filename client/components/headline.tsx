import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const headline = (props: Props) => {

    // if stored headline - css = white text
    // if queried headline - css = green & black text
    // image above, headline below

    return (
        <View>
            <Text>headline</Text>
        </View>
    )
}

export default headline

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from './../components/root-stack-param-list'

interface AuthScreenProp {
    navigation: StackNavigationProp<RootStackParamList, 'Auth'>
    route: RouteProp<RootStackParamList, 'Auth'>
}

const AuthScreen: React.FC<AuthScreenProp> = ({ navigation, route }) => {

    const { id } = route.params;
    console.log(id);

    return (
        <View>
            <Text>auth-screen</Text>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({})
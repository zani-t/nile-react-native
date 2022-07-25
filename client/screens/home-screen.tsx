import { Text, View } from 'react-native'
import React, { useState } from 'react'

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

import { RootStackParamList } from './../components/root-stack-param-list'
import { styles, title_props, version_props, acknowledgement_props } from '../styles/home-styles';

type headline_type = 'stored' | 'queried';

interface HomeScreenProp {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>
    route: RouteProp<RootStackParamList, 'Home'>
}

const HomeScreen: React.FC<HomeScreenProp> = ({ navigation, route }) => {

    // when search attempted - request data from n3k
    // when data successfully received - switch theme to queried
    // run animation & fade
    // display headline in panel with queried info

    // rerequest info in queried state
    // set/add new category

    const { SHARED_ELEMENT_ID } = route.params;
    const PLACEHOLDER_IMG = require('./../assets/placeholder.png');

    // states
    const [displayed_headline, set_displayed_headline] = useState<headline_type>('stored');

    return (
        <Animated.View style={styles().view_container}>
            <Animated.View style={styles().view_header}>
                <View style={styles().view_header_inline}>
                    <Text style={[styles(title_props).text_header,
                    styles().text_header_title]}>YourWorld</Text>
                    <Text style={[styles(version_props).text_header,
                    styles().text_header_version]}>v0.3</Text>
                </View>
                <Text style={[styles(acknowledgement_props).text_header,
                styles().text_header_acknowledgement]}>Powered by Newspaper3k</Text>
            </Animated.View>

            <Animated.View>

            </Animated.View>
        </Animated.View>
    );
};

export default HomeScreen;
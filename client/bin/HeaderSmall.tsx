import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppDisplay } from './App';
import { home_styles, home_animated_styles } from './home-stylesheet'

interface HeaderSmallComponentProps {
    appDisplayControl: AppDisplay;
};

const HeaderSmall: React.FC<HeaderSmallComponentProps> = (props: HeaderSmallComponentProps) => {

    return (
        <Animated.View
            style={[home_styles.view_header_small,
            home_animated_styles({ componentDisplayed: props.appDisplayControl.HeaderSmall })]}>
            <View style={home_styles.view_header_inline}>
                <Text style={[home_styles.text_header,
                    home_styles.text_header_topleft]}>YourWorld</Text>
                <Text style={[home_styles.text_header,
                    home_styles.text_header_topright]}>v0.3</Text>
            </View>
            <Text style={[home_styles.text_header,
                home_styles.text_header_bottom]}>Powered by Newspaper3k</Text>
        </Animated.View>
    );
};

export default HeaderSmall;
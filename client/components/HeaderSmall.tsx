import React, { useState } from "react";
import { Text, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppState } from '../App';
import { home_styles, home_animated_styles } from '../styles/home-stylesheet'

interface HeaderSmallComponentProps {
    appStateControl: React.Dispatch<React.SetStateAction<AppState>>;
};

const HeaderLarge: React.FC<HeaderSmallComponentProps> = (props: HeaderSmallComponentProps) => {
    const [componentDisplayed, setComponentDisplayed] = useState(false);

    // opening sequence
    useState(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setComponentDisplayed(true)
    });

    const closingSequence = async () => {
        setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
    };

    return (
        <Animated.View
            style={[home_styles.view_header_small,
            home_animated_styles({ componentDisplayed: componentDisplayed })]}>
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

export default HeaderLarge;
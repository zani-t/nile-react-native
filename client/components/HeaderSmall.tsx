import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppState, AppDisplay } from '../App';
import { home_styles, home_animated_styles } from '../styles/home-stylesheet'

interface HeaderSmallComponentProps {
    // appStateController: React.Dispatch<React.SetStateAction<AppState>>;
    appDisplayControl: AppDisplay;
    // appDisplayController: React.Dispatch<React.SetStateAction<AppDisplay>>;
};

const HeaderSmall: React.FC<HeaderSmallComponentProps> = (props: HeaderSmallComponentProps) => {
    
    /* useEffect(() => {
        async function openingSequence() {
            await new Promise(resolve => setTimeout(resolve, 500));
            props.appDisplayController({...props.appDisplayControl, HeaderSmall: true});
        }
        openingSequence();
    }, []); */

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

/*interface HeaderSmallState {
    componentDisplayed: boolean;
};

class HeaderSmall extends React.Component<HeaderSmallProps, HeaderSmallState> {
    constructor(props?: any) {
        super(props);
        this.state = { componentDisplayed: false };
        this.setComponentDisplayed = this.setComponentDisplayed.bind(this);
    };

    setComponentDisplayed(setting: boolean) {
        this.setState({ componentDisplayed: setting });
    };

    componentDidMount() {
        // await new Promise(resolve => setTimeout(resolve, 500));
        this.setComponentDisplayed(true);
    };

    async closingSequence() {
        this.setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
    };

    render() {
        return (
            <Animated.View
            style={[home_styles.view_header_small,]}>
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
}*/
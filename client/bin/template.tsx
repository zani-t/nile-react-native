import React, { useState } from "react";
import { Text, View } from "react-native";

import Animated from "react-native-reanimated";

import { AppState } from './App';
// import { _styles, _animated_styles } from '../styles/-stylesheet'

interface _ComponentProps {
    appStateControl: React.Dispatch<React.SetStateAction<AppState>>;
};

const _: React.FC<_ComponentProps> = (props: _ComponentProps) => {
    const [componentDisplayed, setComponentDisplayed] = useState(false);

    // opening sequence
    useState(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setComponentDisplayed(true)
    });

    const closingSequence = async () => {
        setComponentDisplayed(false);
        await new Promise(resolve => setTimeout(resolve, 500));
        // props.appStateControl('HOME');
    };

    return (
        <Animated.View>

        </Animated.View>
    );
};

export default _;
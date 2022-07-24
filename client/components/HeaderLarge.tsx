import React, { useState } from "react";

import Animated from "react-native-reanimated";

import { AppState } from '../App';
import { auth_styles, text_header_animated_styles } from './../styles/auth-style'

interface HeaderLargeComponentProps {
    appStateControl: React.Dispatch<React.SetStateAction<AppState>>;
};

const HeaderLarge: React.FC<HeaderLargeComponentProps> = (props: HeaderLargeComponentProps) => {
    const [componentDisplayed, setComponentDisplayed] = useState(false);

    const closingSequence = () => {
        
    };

    useState(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setComponentDisplayed(true)
    });

    return (
        <Animated.Text
            style={[auth_styles.text_header,
                text_header_animated_styles({ componentDisplayed: componentDisplayed })]}>
                    YW</Animated.Text>
    );
};

export default HeaderLarge;
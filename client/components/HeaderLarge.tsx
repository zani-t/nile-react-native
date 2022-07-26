import React from "react";

import Animated from "react-native-reanimated";

import { AppDisplay } from '../App';
import { auth_styles, auth_animated_styles } from '../styles/auth-stylesheet'

interface HeaderLargeComponentProps {
    appDisplayControl: AppDisplay;
};

const HeaderLarge: React.FC<HeaderLargeComponentProps> = (props: HeaderLargeComponentProps) => {

    return (
        <Animated.Text
            style={[auth_styles.text_header,
                auth_animated_styles({ componentDisplayed: props.appDisplayControl.HeaderLarge })]}>
                    YW</Animated.Text>
    );
};

export default HeaderLarge;
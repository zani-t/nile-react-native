import { StyleSheet } from 'react-native';

import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import * as LSU from "./../../utils/LayoutStateUtils";
import * as SCU from "./../../utils/StyleConstUtils";

export const imageSplashAnimatedStyles = (props: LSU.DisplayState) => {
    const animationValue = useDerivedValue(() => {
        return props.SplashImage
            ? withTiming(1, { duration: SCU.DURATION })
            : withTiming(0, { duration: SCU.DURATION });
    }, [props]);
    const animationOutput = useAnimatedStyle(() => {
        return {
            opacity: animationValue.value,
        };
    });
    return animationOutput;
};

export const splashStyles = StyleSheet.create({
    imageSplash: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
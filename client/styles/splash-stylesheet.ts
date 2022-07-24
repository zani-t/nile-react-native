import { StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

interface SplashStylesheetProps {
    splashAnimationTriggered: boolean;
}

export const image_splash_animated_styles = (props: SplashStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.splashAnimationTriggered === true ? withTiming(0) : withTiming(1);
    }, [props]);
    const animation_output = useAnimatedStyle(() => {
        return {
            opacity: animation_value.value,
        };
    });
    return animation_output;
};

export const splash_styles = StyleSheet.create({
    image_splash: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
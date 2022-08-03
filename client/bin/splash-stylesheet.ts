import { StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

interface SplashStylesheetProps {
    componentDisplayed: boolean;
}

const DUR_MS = 750;

export const image_splash_animated_styles = (props: SplashStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.componentDisplayed === true ?
            withTiming(1, { duration: DUR_MS }) : withTiming(0, { duration: DUR_MS });
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
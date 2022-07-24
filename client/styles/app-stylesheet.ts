import { StyleSheet } from "react-native";
import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { ComponentState } from '../App';

interface MainStylesheetProps {
    splashScreenDisplayed?: ComponentState;
    authScreenDisplayed?: ComponentState;
    homeStoredDisplayed?: ComponentState;
    homeQueriedDisplayed?: ComponentState;
    sortScreenDisplayed?: ComponentState;
}

const view_container_colors = {
    blue: '#1756f8',
    green: '#004b3e',
};

export const view_container_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.splashScreenDisplayed === 'OPEN' ? withTiming(0) : withTiming(1);
    }, [props]);
    const animation_output = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animation_value.value,
                [0, 1],
                [view_container_colors.blue, view_container_colors.green]
            ),
        };
    });
    return animation_output;
};

export const app_styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    view_panel_inner: {

    },
    view_panel_outer: {

    }
});
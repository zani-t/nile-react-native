import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState } from '../App';

interface MainStylesheetProps {
    appState: AppState;
}

const { height, width } = Dimensions.get('window');

const view_container_colors = {
    blue: '#1756f8',
    green: '#004b3e',
};

const panel_heights = {
    splash: {
        sharedValue: 0,
        top: height * 1.00,
        center: height * .00,
        bottom: height * .00,
    },
    auth: {
        sharedValue: 1,
        top: height * .55,
        center: height * .00,
        bottom: height * .45,
    },
    home: {
        sharedValue: 2,
        top: height * .60,
        center: height * .00,
        bottom: height * .40,
    },
    confirm_sort: {
        sharedValue: 3,
        top: height * .18,
        center: height * .27,
        bottom: height * .55,
    },
}

export const view_container_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.appState === 'SPLASH' ? withTiming(0) : withTiming(1);
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

export const view_top_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        switch (props.appState) {
            case 'SPLASH':
                return panel_heights.splash.sharedValue;
            case 'AUTH':
                return withTiming(panel_heights.auth.sharedValue);
            case 'HOME':
                return withTiming(panel_heights.home.sharedValue);
            default:
                return withTiming(panel_heights.confirm_sort.sharedValue);
        }
    }, [props]);

    const animation_output = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animation_value.value,
                [panel_heights.splash.sharedValue,
                panel_heights.auth.sharedValue,
                panel_heights.home.sharedValue,
                panel_heights.confirm_sort.sharedValue],
                [panel_heights.splash.top,
                panel_heights.auth.top,
                panel_heights.home.top,
                panel_heights.confirm_sort.top]),
        };
    });
    return animation_output;
};

export const view_top_conditional_styles = (props: MainStylesheetProps) => {
    var output: ViewStyle = { justifyContent: 'flex-start' };
    switch (props.appState) {
        case 'AUTH':
            output.justifyContent = 'center';
        default:
            return output;
    }
};

export const app_styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    view_panel_top: {
        width: '100%',
        paddingTop: '12%',
    },
    view_panel_center: {
        backgroundColor: 'blue',
    },
    view_panel_bottom: {
        backgroundColor: 'purple',
    }
});
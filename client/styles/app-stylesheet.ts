import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState } from '../App';
import Colors from './colors';

interface MainStylesheetProps {
    appState: AppState;
}

const DUR_MS = 750;
const { height, width } = Dimensions.get('window');

const panel_heights = {
    splash: {
        sharedValue: 0,
        top: height * 1.00,
        center: height * .00,
        bottom: height * .00,
    },
    auth: {
        sharedValue: 1,
        top: height * .52,
        center: height * .00,
        bottom: height * .48,
    },
    home: {
        sharedValue: 2,
        top: height * .58,
        center: height * .00,
        bottom: height * .42,
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
                [Colors.blue, Colors.green]
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
                return withTiming(panel_heights.auth.sharedValue, { duration: DUR_MS });
            case 'HOME':
                return withTiming(panel_heights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panel_heights.confirm_sort.sharedValue, { duration: DUR_MS });
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
    var conditionalStyle: ViewStyle = { };
    switch (props.appState) {
        case 'SPLASH':
            conditionalStyle.marginTop = '5%';
            break;
        case 'AUTH':
            conditionalStyle.justifyContent = 'center';
            break;
    }
    return conditionalStyle;
};

export const view_bottom_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        switch (props.appState) {
            case 'SPLASH':
                return panel_heights.splash.sharedValue;
            case 'AUTH':
                return withTiming(panel_heights.auth.sharedValue, { duration: DUR_MS });
            case 'HOME':
                return withTiming(panel_heights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panel_heights.confirm_sort.sharedValue, { duration: DUR_MS });
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
                [panel_heights.splash.bottom,
                panel_heights.auth.bottom,
                panel_heights.home.bottom,
                panel_heights.confirm_sort.bottom]),
            backgroundColor: interpolateColor(
                animation_value.value,
                [0, 1, 2, 3],
                [Colors.dark_green,
                Colors.dark_green,
                Colors.white,
                Colors.white]
            )
        };
    });
    return animation_output;
};

export const view_bottom_conditional_styles = (props: MainStylesheetProps) => {
    var conditionalStyle: ViewStyle = { };
    switch (props.appState) {
        case 'AUTH':
            conditionalStyle.paddingTop = '12%';
        default:
            return conditionalStyle;
    }
};

export const app_styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    view_panel_top: {
        width: '100%',
        marginTop: '12%',
    },
    view_panel_center: {
        backgroundColor: 'blue',
    },
    view_panel_bottom: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});
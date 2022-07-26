import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState, KeyboardState } from '../App';
import Colors from './colors';

interface MainStylesheetProps {
    appState: AppState;
    keyboardState?: KeyboardState;
}

const DUR_MS = 750;
const { height, width } = Dimensions.get('window');

const panel_heights = {
    splash: {
        sharedValue: 0,
        upper: height * 1.00,
        center: height * .00,
        lower: height * .00,
    },
    auth: {
        sharedValue: 1,
        upper: height * .52,
        center: height * .00,
        lower: height * .48,
    },
    home: {
        sharedValue: 2,
        upper: height * .58,
        center: height * .00,
        lower: height * .42,
    },
    confirm_sort: {
        sharedValue: 3,
        upper: height * .18,
        center: height * .27,
        lower: height * .55,
    },

    key_auth: {
        sharedValue: 0,
        upper: height * .20,
        center: height * .00,
        lower: height * .78,
    }
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

export const view_upper_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        switch (props.appState) {
            case 'SPLASH':
                return panel_heights.splash.sharedValue;
            case 'AUTH':
                switch (props.keyboardState) {
                    case 'AUTH':
                        return withTiming(panel_heights.key_auth.sharedValue, { duration: DUR_MS });
                    default:
                        return withTiming(panel_heights.auth.sharedValue, { duration: DUR_MS });
                }
            case 'HOME':
                return withTiming(panel_heights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panel_heights.confirm_sort.sharedValue, { duration: DUR_MS });
        }
    }, [props]);

    const animation_output = useAnimatedStyle(() => {
        return props.keyboardState === 'OFF' ? {
            height: interpolate(
                animation_value.value,
                [panel_heights.splash.sharedValue,
                panel_heights.auth.sharedValue,
                panel_heights.home.sharedValue,
                panel_heights.confirm_sort.sharedValue],
                [panel_heights.splash.upper,
                panel_heights.auth.upper,
                panel_heights.home.upper,
                panel_heights.confirm_sort.upper]),
        } : {
            height: interpolate(
                animation_value.value,
                [panel_heights.key_auth.sharedValue,
                panel_heights.auth.sharedValue],
                [panel_heights.key_auth.upper,
                panel_heights.auth.upper]
            ),
        }
    });
    return animation_output;
};

export const view_upper_conditional_styles = (props: MainStylesheetProps) => {
    var conditionalStyle: ViewStyle = {};
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

export const view_lower_animated_styles = (props: MainStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        switch (props.appState) {
            case 'SPLASH':
                return panel_heights.splash.sharedValue;
            case 'AUTH':
                switch (props.keyboardState) {
                    case 'AUTH':
                        return withTiming(panel_heights.key_auth.sharedValue, { duration: DUR_MS });
                    default:
                        return withTiming(panel_heights.auth.sharedValue, { duration: DUR_MS });
                }
            case 'HOME':
                return withTiming(panel_heights.home.sharedValue, { duration: DUR_MS });
            default:
                return withTiming(panel_heights.confirm_sort.sharedValue, { duration: DUR_MS });
        }
    }, [props]);

    const animation_output = useAnimatedStyle(() => {
        var final_value: ViewStyle = {
            backgroundColor: interpolateColor(
                animation_value.value,
                [0, 1, 2, 3],
                [Colors.dark_green,
                Colors.dark_green,
                Colors.white,
                Colors.white]
            )
        }
        final_value.height = props.keyboardState === 'OFF' ?
            interpolate(
                animation_value.value,
                [panel_heights.splash.sharedValue,
                panel_heights.auth.sharedValue,
                panel_heights.home.sharedValue,
                panel_heights.confirm_sort.sharedValue],
                [panel_heights.splash.lower,
                panel_heights.auth.lower,
                panel_heights.home.lower,
                panel_heights.confirm_sort.lower]) :
            interpolate(
                animation_value.value,
                [panel_heights.key_auth.sharedValue,
                panel_heights.auth.sharedValue],
                [panel_heights.key_auth.lower,
                panel_heights.auth.lower]);
        return final_value;
    });
    return animation_output;
};

export const view_lower_conditional_styles = (props: MainStylesheetProps) => {
    var conditionalStyle: ViewStyle = {};
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
    view_panel_upper: {
        width: '100%',
        marginTop: '12%',
    },
    view_panel_center: {
        backgroundColor: 'blue',
    },
    view_panel_lower: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});
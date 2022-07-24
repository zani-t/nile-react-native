import { StyleSheet } from "react-native";
import { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState } from '../App';

interface MainStylesheetProps {
    appState: AppState;
}

const view_container_colors = {
    blue: '#1756f8',
    green: '#004b3e',
};

const panel_heights = {
    splash: {
        top: '100%',
    },
    auth: {
        top: '55%',
    },
    home: {
        top: '60%',
    },
    confirm_sort: {
        top: '18%',
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
                return withTiming(panel_heights.splash.top);
            case 'AUTH':
                return withTiming(panel_heights.auth.top);
            case 'HOME':
                return withTiming(panel_heights.home.top);
            default:
                return withTiming(panel_heights.confirm_sort.top);
        }
    }, [props]);
    const animation_output = useAnimatedStyle(() => {
        return {
            height: animation_value.value,
        };
    });
    return animation_output;
};

export const app_styles = StyleSheet.create({
    view_container: {
        flex: 1,
    },
    view_panel_top: {
        width: '100%',
    },
    view_panel_center: {

    },
    view_panel_bottom: {

    }
});
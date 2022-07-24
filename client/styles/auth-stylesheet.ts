import { StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, } from 'react-native-reanimated';

import Colors from './colors';

interface AuthStylesheetProps {
    componentDisplayed: boolean;
}

const DUR_MS = 750;

// header not fading correctly?
export const auth_animated_styles = (props: AuthStylesheetProps) => {
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

export const auth_styles = StyleSheet.create({
    view_auth_content: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    view_button_container: {
        flexDirection: 'row',
    },

    text_header: {
        width: '100%',
        fontSize: 72,
        fontFamily: 'Poppins-SemiBoldItalic',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 5, height: 6 },
        textShadowRadius: 10,
        color: Colors.gold,
    },
    text_input_auth: {
        width: '75%',
        marginBottom: '10%',
        borderBottomColor: '#c7d8d4',
        borderBottomWidth: 1,
        fontFamily: 'Poppins',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        color: Colors.white,
    },
    text_button: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: Colors.white,
    },
});
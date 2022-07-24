import { StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming, } from 'react-native-reanimated';

interface AuthStylesheetProps {
    componentDisplayed: boolean;
}

// header not fading correctly?
export const auth_animated_styles = (props: AuthStylesheetProps) => {
    const animation_value = useDerivedValue(() => {
        return props.componentDisplayed === true ? withTiming(1) : withTiming(0);
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
        color: '#ffbb1a',
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
        color: 'white',
    },
    text_button: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: 'white',
    },
});
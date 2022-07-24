import { StyleSheet } from "react-native";
import { useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

interface AuthStylesheetProps {
    componentDisplayed: boolean;
}

export const text_header_animated_styles = (props: AuthStylesheetProps) => {
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
        
    },
    text_button: {
        
    },
});
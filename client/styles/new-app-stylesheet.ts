import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { interpolate, interpolateColor, useAnimatedStyle, useDerivedValue, withTiming, } from 'react-native-reanimated';

import { AppState, KeyboardState } from '../App';
import Colors from './colors';

interface MainStylesheetProps {
    states: any,
    initialState: any[];
}

interface ConditionalStylesheetProps {
    appState: AppState;
}

const DUR_MS = 750;
const { height, width } = Dimensions.get('window');



// Animated styles
export const viewContainerAnimatedStyles = (props: MainStylesheetProps) => {

}

export const viewUpperAnimatedStyles = (props: MainStylesheetProps) => {

}

export const viewLowerAnimatedStyles = (props: MainStylesheetProps) => {

}

// Conditional styles
export const viewUpperConditionalStyles = (props: ConditionalStylesheetProps) => {
    let conditionalStyle: ViewStyle = {};
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

export const viewLowerConditionalStyles = (props: ConditionalStylesheetProps) => {
    let conditionalStyle: ViewStyle = {};
    switch (props.appState) {
        case 'AUTH':
            conditionalStyle.paddingTop = '12%';
        default:
            return conditionalStyle;
    }
};

export const appStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    viewPanelUpper: {
        width: '100%',
        marginTop: '12%',
    },
    viewPanelCenter: {
        backgroundColor: 'blue',
    },
    viewPanelLower: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
});
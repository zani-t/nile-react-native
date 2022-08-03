import React, { useState } from "react";

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { AuthProvider } from './context/AuthContext';
import * as LSU from './utils/LayoutStateUtils';

import { containerStyles, viewContainerAnimatedStyles } from './styles/ContainerStylesheet';

import UpperPanel from './components/upper-panel/UpperPanel';
import SplashImage from './components/upper-panel/SplashImage';
import HeaderLarge from './components/upper-panel/HeaderLarge';
import CenterPanel from './components/upper-panel/UpperPanel';
import LowerPanel from './components/upper-panel/UpperPanel';
import { upperPanelStyles, viewUpperAnimatedStyles, viewUpperConditionalStyles } from "./styles/upper-panel/UpperPanelStylesheet";
import { lowerPanelStyles, viewLowerAnimatedStyles, viewLowerConditionalStyles } from "./styles/lower-panel/LowerPanelStylesheet";
import AuthElements from "./components/lower-panel/AuthElements";

export default function App() {

    // const [animationToggle, setAnimationToggle] = useState(0);
    const [initialState, setInitialState] = useState<LSU.PanelState>('SPLASH');
    const [targetState, setTargetState] = useState<LSU.PanelState>('SPLASH');
    const [displayState, setDisplayState] = useState<LSU.DisplayState>(LSU.SplashDisplayState);

    const getStates = () => {
        return {
            states: {
                // animToggle: animationToggle,
                initialState: initialState,
                targetState: targetState,
                displayState: displayState,
                // setAnimToggle: setAnimationToggle,
                setInitialState: setInitialState,
                setTargetState: setTargetState,
                setDisplayState: setDisplayState,
            },
        };
    };

    return (
        <AuthProvider>

            <Animated.View style={[
                containerStyles.viewContainer,
                viewContainerAnimatedStyles(getStates())]}>

                <UpperPanel style={[
                    upperPanelStyles.viewUpper,
                    viewUpperAnimatedStyles(getStates()),
                    viewUpperConditionalStyles(targetState)]}>

                    {initialState === 'SPLASH' &&
                        <SplashImage states={getStates().states} />}
                    {initialState === 'AUTH' &&
                        <HeaderLarge states={getStates().states} />}

                </UpperPanel>

                <CenterPanel>

                </CenterPanel>

                <LowerPanel style={[
                    lowerPanelStyles.viewLower,
                    viewLowerAnimatedStyles(getStates()),
                    viewLowerConditionalStyles(targetState)]}>

                    {initialState === 'AUTH' &&
                        <AuthElements states={getStates().states} />}

                </LowerPanel>

            </Animated.View>
            <StatusBar style="light" />

        </AuthProvider>
    );
    
};
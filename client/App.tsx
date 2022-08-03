import React, { useState } from "react";

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { AuthProvider } from './context/AuthContext';
import * as LSU from './utils/LayoutStateUtils';

import { containerStyles, viewContainerAnimatedStyles } from './styles/ContainerStylesheet';

import UpperPanel from './components/upper-panel/UpperPanel';
import { upperPanelStyles, viewUpperAnimatedStyles, viewUpperConditionalStyles } from './styles/UpperPanelStylesheet';
import SplashImage from './components/upper-panel/SplashImage';
import HeaderLarge from './components/upper-panel/HeaderLarge';

import CenterPanel from './components/upper-panel/UpperPanel';

import LowerPanel from './components/upper-panel/UpperPanel';
import { lowerPanelStyles, viewLowerAnimatedStyles, viewLowerConditionalStyles } from './styles/LowerPanelStylesheet';
import AuthElements from './components/lower-panel/AuthElements';
import PanelButtons from './components/lower-panel/PanelButtons';
import LinkInput from './components/lower-panel/LinkInput';
import HeaderSmall from './components/upper-panel/HeaderSmall';

export default function App() {

    const [initialState, setInitialState] = useState<LSU.PanelState>('SPLASH');
    const [targetState, setTargetState] = useState<LSU.PanelState>('SPLASH');
    const [displayState, setDisplayState] = useState<LSU.DisplayState>(LSU.SplashDisplayState);
    // const [articles, setArticles] = useState(null);

    const getStates = () => {
        return {
            states: {
                initialState: initialState,
                targetState: targetState,
                displayState: displayState,
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
                    {(initialState === 'HOME' || initialState === 'HOME_INPUT') &&
                        <HeaderSmall states={getStates().states} />}

                </UpperPanel>

                <CenterPanel>

                </CenterPanel>

                <LowerPanel style={[
                    lowerPanelStyles.viewLower,
                    viewLowerAnimatedStyles(getStates()),
                    viewLowerConditionalStyles(targetState)]}>

                    {(initialState === 'AUTH' || initialState === 'AUTH_INPUT') &&
                        <AuthElements states={getStates().states} />}
                    {(initialState === 'HOME' || initialState === 'HOME_INPUT') &&
                        <>
                            <PanelButtons states={getStates().states} />
                            <LinkInput states={getStates().states} />
                        </>}

                </LowerPanel>

            </Animated.View>
            <StatusBar style="light" />

        </AuthProvider>
    );

};
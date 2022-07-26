import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { AuthProvider } from './context/AuthContext';
import * as LSU from './utils/LayoutStateUtils';

import { containerStyles, viewContainerAnimatedStyles } from './styles/ContainerStylesheet';

import UpperPanel from './components/upper-panel/UpperPanel';
import { upperPanelStyles,
    viewUpperAnimatedStyles,
    viewUpperConditionalStyles } from './styles/UpperPanelStylesheet';
import SplashImage from './components/upper-panel/SplashImage';
import HeaderLarge from './components/upper-panel/HeaderLarge';
import HeaderSmall from './components/upper-panel/HeaderSmall';
import StoredHeadline from './components/upper-panel/StoredHeadline';

import CenterPanel from './components/upper-panel/UpperPanel';
import { centerPanelStyles, viewCenterAnimatedStyles, viewCenterConditionalStyles } from './styles/CenterPanelStylesheet';
import Categories from './components/center-panel/Categories';

import LowerPanel from './components/upper-panel/UpperPanel';
import { lowerPanelStyles,
    viewLowerAnimatedStyles,
    viewLowerConditionalStyles } from './styles/LowerPanelStylesheet';
import AuthElements from './components/lower-panel/AuthElements';
import QueriedHeadline from './components/lower-panel/QueriedHeadline';
import PanelButtons from './components/lower-panel/PanelButtons';
import LinkInput from './components/lower-panel/LinkInput';
import ExtraHeadlines from "./components/lower-panel/ExtraHeadlines";

export default function App() {

    const [initialState, setInitialState] = useState<LSU.PanelState>('SPLASH');
    const [targetState, setTargetState] = useState<LSU.PanelState>('SPLASH');
    const [displayState, setDisplayState] = useState<LSU.DisplayState>(LSU.SplashDisplayState);
    const [articles, setArticles] = useState<LSU.Article[]>([]);
    const [queriedArticle, setQueriedArticle] = useState<LSU.Article | null>(null);

    const getStates = () => {
        return {
            states: {
                initialState: initialState,
                targetState: targetState,
                displayState: displayState,
                articles: articles,
                queriedArticle: queriedArticle,
                setInitialState: setInitialState,
                setTargetState: setTargetState,
                setDisplayState: setDisplayState,
                setArticles: setArticles,
                setQueriedArticle: setQueriedArticle,
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
                    {(initialState === 'HOME'
                        || initialState === 'HOME_INPUT'
                        || initialState === 'QUERY') &&
                        <>
                            <HeaderSmall states={getStates().states} />
                            <StoredHeadline states={getStates().states} />
                        </>}

                </UpperPanel>

                <CenterPanel style={[
                    centerPanelStyles.viewCenter,
                    viewCenterAnimatedStyles(getStates()),
                    viewCenterConditionalStyles(targetState)]}>

                    {initialState === 'SORT' && 
                        <Categories states={getStates().states} />}

                    <LowerPanel style={[
                        lowerPanelStyles.viewLower,
                        viewLowerAnimatedStyles(getStates()),
                        viewLowerConditionalStyles(targetState)]}>

                        {(initialState === 'AUTH' || initialState === 'AUTH_INPUT') &&
                            <AuthElements states={getStates().states} />}
                        {(initialState === 'HOME'
                            || initialState === 'HOME_INPUT'
                            || initialState === 'QUERY') &&
                            <>
                                <PanelButtons states={getStates().states} />
                                <QueriedHeadline states={getStates().states} />
                                <LinkInput states={getStates().states} />
                                <ExtraHeadlines states={getStates().states} />
                            </>}

                    </LowerPanel>

                </CenterPanel>

            </Animated.View>
            <StatusBar style="light" translucent={true} />

        </AuthProvider>
    );

};
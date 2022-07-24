import React, { useState } from 'react'

import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';

import { app_styles, view_container_animated_styles } from './styles/app-stylesheet';
import SplashImage from './components/SplashImage';

export type ComponentState = 'CLOSED' | 'OPEN'

export default function App() {

    // states
    // 
    const [splashScreenDisplayed, setSplashScreenDisplayed] = useState<ComponentState>('OPEN');

    return (
        <Animated.View
            style={[app_styles.view_container,
            view_container_animated_styles({ splashScreenDisplayed: splashScreenDisplayed })]}>
            <SplashImage componentStateControl={setSplashScreenDisplayed}/>
            <StatusBar style="light"/>
        </Animated.View>
    )
};

// animation method - fade elements, change state, show new elements

    // permanent - container, above panel

    // splash - container blue, splash image
    // auth - container green, panel up, panel green, header, inputs
    // home - panel down, panel white, stored article, panel buttons, enter link, other articles
    // confirm - panel up, queried article
    // categories - panel down, inner panel up, categories, articles

    // all components
    // splash image

    // yw header 1
    // auth elements (email, password, buttons* - contact mongo)

    // yw header 2
    // stored headline (photo, text)* - go to web
    // panel buttons* - refresh[/contact mongo], log out, trigger categories
    // txt input* - contact django & trigger confirm stg 1 // set category, contact mongo, trigger home
    // extra articles* - go to web
    // queried headline (photo, text)* - trigger confirm stg 2, change txt input properties
    // category list
    // article list (text*) - [rearrange/renamea articles/partially reload list]
    // home button - trigger home, contact mongo
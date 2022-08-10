import React from 'react';
import { Text, View } from 'react-native';

import Animated from 'react-native-reanimated';
import { headerSmallAnimatedStyles } from '../../styles/upper-panel/HeaderSmallStylesheet';
import { headerSmallStyles } from '../../styles/upper-panel/HeaderSmallStylesheet';

import * as LSU from './../../utils/LayoutStateUtils';

const HeaderSmall: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    return(
        <Animated.View style={[
            headerSmallStyles.viewHeaderSmall,
            headerSmallAnimatedStyles(props.states.displayState)]}>

            <View style={headerSmallStyles.viewHeaderInline}>
                <Text style={[
                    headerSmallStyles.textHeader,
                    headerSmallStyles.textHeaderTopLeft]}>
                        YourWorld</Text>
                <Text style={[
                    headerSmallStyles.textHeader,
                    headerSmallStyles.textHeaderTopRight]}>
                        v0.6</Text>
            </View>
            <Text style={[
                    headerSmallStyles.textHeader,
                    headerSmallStyles.textHeaderBottom]}>
                        Powered by Newspaper3k</Text>

        </Animated.View>
    );

};

export default HeaderSmall;
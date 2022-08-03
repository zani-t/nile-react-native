import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import { linkInputAnimatedStyles, linkInputStyles } from '../../styles/lower-panel/LinkInputStylesheet';

const LinkInput: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const [link, setLink] = useState('');

    return (
        <Animated.View style={[
            linkInputStyles.viewLinkContainer,
            linkInputAnimatedStyles(props.states.displayState)]}>

            <TextInput
                style={linkInputStyles.textInputLink}
                autoCapitalize="none"
                placeholder=" Enter link..."
                placeholderTextColor="#b7b7b7"
                onChangeText={text => setLink(text)}
                value={link} />
            <TouchableOpacity style={linkInputStyles.iconEnterLink}>
                <MaterialCommunityIcons
                    name="pencil-plus"
                    size={20}
                    color={SCU.COLORS.GREEN} />
            </TouchableOpacity>

        </Animated.View>
    );

};

export default LinkInput;
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Animated, { pow } from 'react-native-reanimated';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import AxiosDynamic from '../../utils/AxiosDynamic';
import * as LSU from './../../utils/LayoutStateUtils';
import * as SCU from './../../utils/StyleConstUtils';
import {
    storedHeadlineAnimatedStyles,
    viewContainerAnimatedStyles,
    storedHeadlineStyles
} from '../../styles/upper-panel/StoredHeadlineStylesheet';

const StoredHeadline: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const axiosDynamic = AxiosDynamic();
    const [articleOfDay, setArticleOfDay] = useState<LSU.Article>();
    // const [articleTitles, setArticleTitles] = useState<LSU.Article[]>([]);

    useEffect(() => {
        async function openingSequence() {
            try {
                // Get all of user's articles
                const response = await axiosDynamic.get('articles/');
                props.states.setArticles(response.data);
            } catch (error) {
                console.log(`StoredHeadline.tsx openingSequence ${error}`);
            };
        };
        openingSequence();
    }, []);

    useEffect(() => {
        // Set article of day once articles global state is updated
        dayjs.extend(dayOfYear);
        if (!articleOfDay) {
            const articles = props.states.articles;
            // setArticleOfDay(articles[dayjs().dayOfYear() % articles.length]);
            setArticleOfDay(articles[2]);
        };
    }, [props])

    return (
        <Animated.View style={[
            storedHeadlineStyles.viewStoredContainer,
            storedHeadlineAnimatedStyles(props.states.displayState)]}>

            <TouchableOpacity>
                <View style={storedHeadlineStyles.viewImageContainer}>
                    {articleOfDay && 
                        <Image
                            style={storedHeadlineStyles.imageStored}
                            source={{ uri: articleOfDay.img }} />}
                </View>
                { /* { props.states.initialState === 'HOME' && */ }
                    <Animated.View style={[
                        storedHeadlineStyles.viewTextContainer,
                        viewContainerAnimatedStyles(props.states.displayState)]}>
                        <Text style={storedHeadlineStyles.textStoredHeadlineUpper}>
                            Today's Read: {articleOfDay?.category}</Text>
                        <Text style={storedHeadlineStyles.textStoredHeadlineLower}>
                            {articleOfDay?.title}</Text>
                    </Animated.View>{ /* } */ }
            </TouchableOpacity>

        </Animated.View>
    );

}

export default StoredHeadline;
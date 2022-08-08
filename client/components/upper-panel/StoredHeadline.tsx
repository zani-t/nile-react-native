import React, { useEffect, useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import AxiosDynamic from '../../utils/AxiosDynamic';
import * as LSU from './../../utils/LayoutStateUtils';
import { storedHeadlineAnimatedStyles, storedHeadlineStyles } from '../../styles/upper-panel/StoredHeadlineStylesheet';

const StoredHeadline: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const axiosDynamic = AxiosDynamic();
    const [articleOfDay, setArticleOfDay] = useState<LSU.Article>();
    // const [articleTitles, setArticleTitles] = useState<LSU.Article[]>([]);

    const openURL = () => {
        if (articleOfDay) {
            Linking.openURL(articleOfDay?.url);
        };
    };

    useEffect(() => {
        async function openingSequence() {
            try {
                // Get all of user's articles
                const response = await axiosDynamic.get('articles/');
                props.states.setArticles(response.data);
                props.states.setDisplayState(LSU.HomeDisplayState);
            } catch (error) {
                console.log(`StoredHeadline.tsx openingSequence ${error}`);
                props.states.setDisplayState({
                    ...LSU.HomeDisplayState,
                    StoredHeadline: false,
                    ExtraHeadlines: false,
                });
            };
        };
        openingSequence();
    }, []);

    useEffect(() => {
        // Set article of day once articles global state is updated
        dayjs.extend(dayOfYear);
        if (!articleOfDay) {
            const articles = props.states.articles;
            setArticleOfDay(articles[(dayjs().dayOfYear()) % articles.length]);
            // setArticleOfDay(articles[2]);
        };
    }, [props])

    return (
        <Animated.View style={[
            storedHeadlineStyles.viewStoredContainer,
            storedHeadlineAnimatedStyles(props.states.displayState)]}>

            <TouchableOpacity onPress={openURL}>
                <View style={storedHeadlineStyles.viewImageContainer}>

                    {articleOfDay &&
                        <Image
                            style={storedHeadlineStyles.imageStored}
                            source={{ uri: articleOfDay.img }} />}
                </View>
                <View style={storedHeadlineStyles.viewTextContainer}>
                    <Text style={storedHeadlineStyles.textStoredHeadlineUpper}>
                        Today's Read: {articleOfDay?.category}</Text>
                    <Text style={storedHeadlineStyles.textStoredHeadlineLower}>
                        {articleOfDay?.title}</Text>
                </View>
            </TouchableOpacity>

        </Animated.View>
    );

}

export default StoredHeadline;
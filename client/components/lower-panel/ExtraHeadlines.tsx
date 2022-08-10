import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import * as LSU from './../../utils/LayoutStateUtils';
import {
    extraHeadlinesAnimatedStyles,
    extraHeadlineStyles
} from '../../styles/lower-panel/ExtraHeadlinesStylesheet';

const ExtraHeadlines: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const randomArticleMap = new Map<number, LSU.Article>();
    const [randomArticleList, setRandomArticleList] = useState<LSU.Article[]>();
    const [aotdIndex, setAotdIndex] = useState<number>();
    
    // on articles: set aotd index, 
    // on display: set random articles

    useEffect(() => {
        async function openingSequence() {
            setAotdIndex(dayjs().dayOfYear() % props.states.articles.length);
        };
        if (props.states.articles) {
            openingSequence();
        };
    }, [props.states.articles === []]);

    useEffect(() => {
        if (props.states.displayState.ExtraHeadlines) {
            const maxArticles = Math.min(props.states.articles.length - 1, 3);
            let articleIndex: number;
            while (randomArticleMap.size < maxArticles) {
                // Get article that is not aotd or present in randomarticles
                articleIndex = Math.floor((Math.random() * props.states.articles.length))
                if (!randomArticleMap.has(articleIndex) && articleIndex !== aotdIndex) {
                    randomArticleMap.set(articleIndex, props.states.articles[articleIndex]);
                };
                setRandomArticleList(Array.from(randomArticleMap.values()));
            };
        };
    }, [props.states.displayState.ExtraHeadlines]);

    /* useEffect(() => {
        async function openingSequence(allArticles: LSU.Article[]) {
            console.log(`extraheadlines.tsx openingsequence ${props.states.articles}`);
            dayjs.extend(dayOfYear);
            const aotdIndex = dayjs().dayOfYear() % allArticles.length
            const maxArticles = Math.min(allArticles.length - 1, 3);
            let articleIndex: number;

            while (randomArticleMap.size < maxArticles) {
                // Get article that is not aotd or present in randomarticles
                articleIndex = Math.floor((Math.random() * allArticles.length))
                if (!randomArticleMap.has(articleIndex) && articleIndex !== aotdIndex) {
                    randomArticleMap.set(articleIndex, allArticles[articleIndex]);
                };
                setRandomArticleList(Array.from(randomArticleMap.values()));
            };
        };
        if (props.states.articles) {
            openingSequence(props.states.articles);
        };
    }, [props.states.articles, props.states.displayState.ExtraHeadlines]) */

    useEffect(() => {
        if (props.states.displayState.ExtraHeadlines) {
            // on load -
        };
    }, [props.states.displayState.ExtraHeadlines]);

    const Headline = (item: LSU.Article) => {
        return (
            <Animated.View style={extraHeadlineStyles.viewHeadlineContainer}>
                <TouchableOpacity onPress={() => {Linking.openURL(item.url)}}>
                    <Text style={extraHeadlineStyles.textHeadline}>
                        <Text style={extraHeadlineStyles.textHeadlineCategory}>{item.category} : {item.source} : </Text>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <Animated.View style={extraHeadlinesAnimatedStyles(props.states.displayState)}>
            {randomArticleList &&
                <FlatList
                    data={randomArticleList}
                    renderItem={itemData =>
                        <Headline
                            category={itemData.item.category}
                            img={itemData.item.img}
                            source={itemData.item.source}
                            title={itemData.item.title}
                            url={itemData.item.url} />} />
            }
        </Animated.View>
    );

}

export default ExtraHeadlines;
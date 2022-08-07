import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import AxiosDynamic from '../../utils/AxiosDynamic';
import * as LSU from './../../utils/LayoutStateUtils';
import {
    storedHeadlineAnimatedStyles,
    viewContainerAnimatedStyles,
    storedHeadlineStyles
} from '../../styles/upper-panel/StoredHeadlineStylesheet';
import { extraHeadlinesAnimatedStyles, extraHeadlineStyles } from '../../styles/lower-panel/ExtraHeadlinesStylesheet';

const ExtraHeadlines: React.FC<LSU.ComponentProps> = (props: LSU.ComponentProps) => {

    const randomArticleMap = new Map<number, LSU.Article>();
    const [randomArticleList, setRandomArticleList] = useState<LSU.Article[]>();

    useEffect(() => {
        async function openingSequence(allArticles: LSU.Article[]) {
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
    }, [props.states.articles])

    const Headline = (item: LSU.Article) => {
        return (
            <Animated.View style={[
                extraHeadlinesAnimatedStyles(props.states.displayState),
                extraHeadlineStyles.viewHeadlineContainer]}>
                <TouchableOpacity>
                    <Text style={extraHeadlineStyles.textHeadline}>
                        <Text style={extraHeadlineStyles.textHeadlineCategory}>{item.category} : {item.source} : </Text>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View>
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
        </View>
    );

}

export default ExtraHeadlines;
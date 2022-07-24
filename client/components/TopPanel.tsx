import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface TopComponentProps {
    style: ViewStyle[];
    children: any
};

const TopPanel: React.FC<TopComponentProps> = (props: TopComponentProps) => {



    return (
        <View style={props.style}>
            {props.children}
        </View>
    );
};

export default TopPanel;

const styles = StyleSheet.create({})
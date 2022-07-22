import { StyleSheet } from "react-native";

type HomeStylesheetProps = {
    font_size?: number;
    offset_width?: number;
    offset_height?: number;
    shadow_radius?: number;
}

export const title_props: HomeStylesheetProps = {
    font_size: 32,
    offset_height: 3,
    offset_width: 3,
    shadow_radius: 4,
}
export const version_props: HomeStylesheetProps = {
    font_size: 20,
    offset_height: 2,
    offset_width: 2,
    shadow_radius: 2,
}
export const acknowledgement_props: HomeStylesheetProps = {
    font_size: 10,
    offset_height: 2,
    offset_width: 2,
    shadow_radius: 2,
}

export const styles = (props?: any) => StyleSheet.create({
    view_container: {
        flex: 1,
        backgroundColor: '#004b3e',
    },
    view_header: {
        height: '18%',
        paddingTop: '12%',
        paddingLeft: '5%',
    },
    view_header_inline: {
        flexDirection: 'row',
    },

    text_header: {
        marginLeft: '1%',
        fontFamily: 'Poppins-SemiBoldItalic',
        fontSize: props?.font_size,
        textAlignVertical: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: props?.offset_width, height: props?.offset_height },
        textShadowRadius: props?.shadow_radius,
        color: '#ffbb1a',
    },
    text_header_title: {
        marginRight: '3%',
    },
    text_header_version: {
        paddingTop: '2%',
        transform: [{ translateX: -4 }]
    },
    text_header_acknowledgement: {

    },
});
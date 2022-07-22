import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    view_container: {
        flex: 1,
        backgroundColor: '#004b3e',
    },
    view_above_panel: {
        height: '55%',
        paddingTop: '5%',
        justifyContent: 'center',
    },
    view_panel: {
        height: '45%',
        paddingTop: '12%',
        backgroundColor: '#003c32',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    view_panel_content: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    view_button_container: {
        flexDirection: 'row',
    },

    text_header: {
        width: '100%',
        fontSize: 72,
        fontFamily: 'Poppins-SemiBoldItalic',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 5, height: 6 },
        textShadowRadius: 10,
        color: '#ffbb1a',
    },
    text_input_auth: {
        width: '75%',
        marginBottom: '10%',
        borderBottomColor: '#c7d8d4',
        borderBottomWidth: 1,
        fontFamily: 'Poppins',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        color: 'white',
    },
    text_button: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        color: 'white',
    }

});
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import colors from "../utils/colors";

export default function SettingsItem(props){
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                {props.title}
                </Text>

                <Text style={styles.subTitle} numberOfLines={1}>
                {props.subTitle}
                </Text>
            </View>

            <View style={styles.iconContainer}>
                <props.iconFamily name={props.icon} size={24} color={colors.primary}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: colors.lightGrey,
        backgroundColor: 'white',
        borderWidth: 1,
        borderTopWidth: 0,
        marginVertical: 3
    },
    textContainer:{
        flex: 1,
        marginRight: 8,
    },
    title:{
        fontFamily: 'medium',
        letterSpacing: 0.3,
        color: colors.textColor,
        marginBottom: 4
    },
    subTitle:{
        fontFamily: 'regular',
        letterSpacing: 0.3,
        color: colors.subTextColor,
        fontSize: 13,  //By default 14
    },
    iconContainer:{
        width: 30,
        alignItems: "center",
        justifyContent: 'center'
    }
})
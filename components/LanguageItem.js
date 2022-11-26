import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";

export default function LanguageItem(props) {
    return <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <View style={styles.iconContainer}>
            {props.selected && <Feather name="check" size={18} color={colors.textColor}/>}
        </View>
        <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 2
    },
    iconContainer:{
        paddingRight: 7,
        width: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        flex: 1,
        fontFamily: 'regular',
        letterSpacing: 0.3
    }
})
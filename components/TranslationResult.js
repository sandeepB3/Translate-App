import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSavedItems } from "../store/savedItemsSlice";
import colors from "../utils/colors";

export default function TranslationResult(props) {
    const dispatch = useDispatch();

    const {itemId} = props;
    const item = useSelector(state => {
        return state.history.items.find(item => item.id === itemId) || 
               state.savedItem.items.find(item => item.id === itemId)
    })
    const savedItems = useSelector(state => state.savedItem.items)

    //some checks if there is any item int the list which matches that conditions, returns true/false
    const isSaved = savedItems.some(i =>  i.id === itemId)
    const starIcon = isSaved ? 'star' : 'star-outlined'

    const starItem = useCallback(async()=> {
        let newSavedItems;

        if(isSaved){
            newSavedItems = savedItems.filter(item => item.id !== itemId)
        }
        else{
            //savedItems is read only list, hence we make a copy of it in newSavedItems using slice
            newSavedItems = savedItems.slice();
            newSavedItems.push(item)
        }

        await AsyncStorage.setItem('savedItems', JSON.stringify(newSavedItems))

        dispatch(setSavedItems({items: newSavedItems}));
    },[dispatch, savedItems])

    return <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text numberOfLines={4} style={styles.title}>{item.original_text}</Text>
            <Text numberOfLines={4} style={styles.subtitle}>{item.translated_text[item.to]}</Text>
        </View>
        <TouchableOpacity 
            onPress={starItem}
            style={styles.iconContainer}>
            <Entypo name={starIcon} size={24} color={colors.subTextColor} />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: colors.lightGrey,
        backgroundColor: 'white',
        borderWidth: 1,
        borderTopWidth: 0,
        marginVertical: 2
    },
    textContainer:{
        flex: 1,
        marginRight: 8,
    },
    title:{
        fontFamily: 'medium',
        letterSpacing: 0.3,
        color: colors.textColor
    },
    subtitle:{
        fontFamily: 'regular',
        letterSpacing: 0.3,
        color: colors.subTextColor,
        fontSize: 13,
    },
    iconContainer: {
        width: 30,
        alignItems: "center",
        justifyContent: 'center'
    }
})
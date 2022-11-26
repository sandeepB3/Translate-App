import { Alert, StyleSheet, Text, View } from 'react-native';
import SettingsItem from '../components/SettingsItem';
import colors from '../utils/colors';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearHistory } from '../store/historySlice';
import { clearSavedItems } from '../store/savedItemsSlice';
import { useCallback } from 'react';

export default function SettingsScreen() {

  const dispatch = useDispatch();

  const deleteHistory = useCallback(async ()=>{
    try {
      await AsyncStorage.setItem('history', JSON.stringify([]));
      dispatch(clearHistory())
      Alert.alert("Success","History cleared");
    } 
    catch (error) {
      console.log(error);
    }
  },[dispatch])

  const clearSaved = useCallback(async ()=>{
    try {
      await AsyncStorage.setItem('savedItems', JSON.stringify([]));
      dispatch(clearSavedItems())
      Alert.alert("Success","Cleared saved items");
    } 
    catch (error) {
      console.log(error);
    }
  },[dispatch])

  return (
      <View style={styles.container}>
        <SettingsItem 
          title="Clear History"
          subTitle="Clears all itmes from your history"
          iconFamily={AntDesign}
          icon="delete"
          onPress={deleteHistory}
        />

        <SettingsItem 
          title="Clear Saved Items"
          subTitle="Clears all saved itmes"
          iconFamily={AntDesign}
          icon="delete"
          onPress={clearSaved}
        />

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 10,
  },
});

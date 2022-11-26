import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import LanguageItem from '../components/LanguageItem';
import colors from '../utils/colors';
import supportedLanguages from '../utils/supportedLanguages';

const CustomHeaderButton = (props) => {
  return <HeaderButton 
      { ...props } 
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color || colors.primary}
    />
}

export default function LanguageSelectScreen({navigation, route}) {
  // const navigation = props.navigation;
  const params = route.params || {};
  const {title, selected, mode} = params;
  useEffect(()=>{
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            iconName="close"
            color={colors.textColor}
            onPress={() => navigation.goBack()}
          />
        </HeaderButtons>
      )
    })
  },[navigation]);
  //This useEffect runs only when navigation changes 

  const onLanguageSelect = useCallback((itemKey) => {
    const dataKey = (mode === 'to' ? 'languageTo' : 'languageFrom');
    navigation.navigate("Home",{[dataKey]: itemKey});
  },[params, navigation])

  return (
      <View style={styles.container}>
        <FlatList 
          data={Object.keys(supportedLanguages)}
          renderItem={(itemData)=> {
            const Key = itemData.item;
            return <LanguageItem 
              onPress={()=>onLanguageSelect(Key)} //Since we are passing parameters we use useCallback
              text={supportedLanguages[Key]}
              selected={Key === selected}
            />
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

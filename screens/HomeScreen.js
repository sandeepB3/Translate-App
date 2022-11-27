import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';
import { TextInput } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import supportedLanguages from '../utils/supportedLanguages';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem, setHistoryItems } from '../store/historySlice';
import TranslationResult from '../components/TranslationResult';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSavedItems } from '../store/savedItemsSlice';
import * as Speech from 'expo-speech';
import {API_HOST, API_KEY} from '@env';

function loadData(){
  return async (dispatch) => {
    try {
      const historyString = await AsyncStorage.getItem('history');
      if(historyString !== null){
        const history = JSON.parse(historyString);
        dispatch(setHistoryItems({items: history}));
      }

      const savedItemsString = await AsyncStorage.getItem('savedItems');
      if(savedItemsString !== null){
        const savedItems = JSON.parse(savedItemsString);
        dispatch(setSavedItems({items: savedItems}));
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export default function HomeScreen(props) {
  const params = props.route.params || {};

  const dispatch = useDispatch();
  const history = useSelector(state => state.history.items); //allows you to access state
                                       //history comes from store where u named historySlice
  
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("de");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(params.languageTo){
      setLanguageTo(params.languageTo)
    }

    if(params.languageFrom){
      setLanguageFrom(params.languageFrom)
    }

  },[params.languageTo, params.languageFrm])

  const voiceToText = useCallback(async ()=>{
    //TO DO
  })

  useEffect(()=>{
    dispatch(loadData());
  },[dispatch])

  useEffect(() => {
    async function saveHistoryLocal(){
      try {
        await AsyncStorage.setItem('history', JSON.stringify(history))
      } 
      catch (error) {
        console.log(error)
      }
    }
    saveHistoryLocal();
  },[history])

  const onSubmit = useCallback(async ()=>{

      const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: {text: enteredText, to: languageTo, from: languageFrom},
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        }
      }

      try{
        setIsLoading(true)
        const response = await axios.request(options)
        // console.log(response.data);
        const toKey = response.data.to
        const result = response.data.translated_text[toKey];
        setResultText(result)

        const id = uuid.v4();
        response.data.id = id;
        response.data.dateTime = new Date().toISOString();

        //dispatching result to addHistory item function of historySlice
        dispatch(addHistoryItem({item: response.data}))
      }
      catch(err){
        console.log(err);
        setResultText("")
      }
      finally{
        setIsLoading(false)
      }
  }, [enteredText, languageTo, languageFrom, dispatch]);

  const copyToClipboard = useCallback(async()=> {
    await Clipboard.setStringAsync(resultText);
  },[resultText]);

  useEffect(()=> {
    const listAllVoiceOptions = async () => {
      let voices = await Speech.getAvailableVoicesAsync();
      // console.log(voices);
    };
    listAllVoiceOptions();
  },[])

  function resultVoice(){
    const translatedVoice = resultText;
    const options = {
      pitch: 1,
      rate: 1
    }
    Speech.speak(translatedVoice, options)
  }
  
  return (
      <View style={styles.container}>
        <View style={styles.languageContainer}>

          <TouchableOpacity 
            onPress={voiceToText}
            style={styles.voiceIconContainer}>
              <MaterialIcons name="keyboard-voice" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.languageOptions}
            onPress={()=> props.navigation.navigate('languageSelect', { title: "Translate from", selected: languageFrom, mode: 'from'})}>
            <Text style={styles.languageOptionText}>{supportedLanguages[languageFrom]}</Text>
          </TouchableOpacity>

          <View style={styles.arrowContainer}>
            <AntDesign name="arrowright" size={24} color={colors.lightGrey} />
          </View>

          <TouchableOpacity 
            style={styles.languageOptions}
            onPress={()=> props.navigation.navigate('languageSelect', { title: "Translate to", selected: languageTo, mode: 'to'})}>
            <Text style={styles.languageOptionText}>{supportedLanguages[languageTo]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput multiline 
            placeholder='Enter Text'
            style={styles.textInput}
            onChangeText={(text)=>{setEnteredText(text)}}
          />

          <TouchableOpacity 
            onPress={isLoading ? undefined : onSubmit}
            disabled={enteredText === ""}
            style={styles.iconContainer}>
            {
              isLoading ? <ActivityIndicator size={'small'} color={colors.primary}/> 
              : <Ionicons 
                  name="arrow-forward-circle-sharp" 
                  size={24} 
                  color={enteredText !== "" ? colors.primary: colors.primaryDisabled}/>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultText}</Text>

          <TouchableOpacity 
            onPress={resultVoice}
            disabled={resultText === ""}
            style={styles.iconContainer}>
            <AntDesign name="sound" size={24} 
            color={resultText !== "" ? colors.primary: colors.textColorDisabled} />
          </TouchableOpacity>
      
          <TouchableOpacity 
            onPress={copyToClipboard}
            disabled={resultText === ""}
            style={styles.iconContainer}>
            <MaterialIcons 
              name="content-copy" 
              size={24} 
              color={resultText !== "" ? colors.textColor: colors.textColorDisabled} />
          </TouchableOpacity>
        </View> 

        <View style={styles.historyContainer}>
            <FlatList 
              data={history.slice().reverse()}
              renderItem={(itemData)=> {
                let id = itemData.item.id;
                return <TranslationResult itemId={id}/>
              }}
            />
        </View>       
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2
  },
  languageOptions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer:{
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionText: {
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.5
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
    height: 90,
  },
  textInput:{
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: 'regular',
    letterSpacing: 0.5,
    color: colors.textColor
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 90,
    paddingVertical: 15, 
  },
  resultText: {
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.5,
    flex: 1,
    marginHorizontal: 20
  },
  historyContainer: {
    backgroundColor: colors.greyBackground,
    flex: 1,
    padding: 10
  },
  voiceIconContainer: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

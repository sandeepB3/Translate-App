import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SavedScreen from './screens/SavedScreen';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import colors from './utils/colors';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store'

// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: (props) => 
          <Entypo name="home" size={props.size} color={props.color} />
        }}
      />
      
      <Tab.Screen 
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: (props) => 
          <Entypo name="star" size={props.size} color={props.color} />
        }}
      />
      
      <Tab.Screen 
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: (props) => 
          <Ionicons name="settings" size={props.size} color={props.color} />
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {

  //1. 
  //appIsLoaded is the state
  //setAppIsLoaded is the function used to change state
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  
  //2.
  //Side-Effect: where we load something like users,data
  useEffect(() => {

    const prepare = async () => {
      try {
        await Font.loadAsync({
          //Fonts we wanna load
          black: require("./assets/fonts/Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf")
        });
      }catch(e){
        console.log(e);
      }finally{
        setAppIsLoaded(true);
      }
    }

    prepare();
  }, [])
  //In useEffect function - (1. function, 2. Dependency List)
  //[] means - we want to load once after the first render

  //OnLayout runs every time the dependency changes
  const onLayout = useCallback(async() =>{
    if(appIsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  //Renders null first time and then useCallback is called
  //useEffect(() => { // Side Effect }, []); 
  //In this case, the side effect runs only once after the initial render of the component.
  if(!appIsLoaded){
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{flex: 1}}> 
          <Stack.Navigator screenOptions={{
            headerTitleStyle: {
              fontFamily: 'medium',
              color: 'white'
            },
            headerStyle: {
              backgroundColor: colors.primary
            }
          }}>
            <Stack.Group>
              <Stack.Screen 
                name="main"
                //React Navigation passes a navigation prop to component
                component={TabNavigator}
                options={{
                  headerTitle: "Translate"
                }}
              />
            </Stack.Group>

            <Stack.Group 
              screenOptions={{
                presentation: 'containedModal',
                headerStyle: {
                  backgroundColor: 'white'
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: 'medium'
                }
              }}
            >
              <Stack.Screen 
                name="languageSelect"
                component={LanguageSelectScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

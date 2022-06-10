// import { StatusBar } from 'expo-status-bar';
// import { View } from 'react-native';
// import * as d from './data'
// const data = d.default
// let arr = []
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import BirthDays from './BirthDays';
import { StyleSheet } from 'react-native';
import Form from './Form';
import Login from './Login';
import Register from './Register';
import FeedData from './FeedData';

const Stack = createNativeStackNavigator();

export default function App() {
//   data.map(ele => {
//     if(parseInt(ele.birthDate.split('-')[1]) === new Date().getMonth() + 1){
//       arr.push(ele)
//     }
//   })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UpComingBirthDays" component={FeedData} />
        <Stack.Screen name="FeedForm" component={Form} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle : {
    width: 400,
    height: 200
  }
});

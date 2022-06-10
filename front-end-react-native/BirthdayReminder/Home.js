import axios from "axios"
import { Button, StyleSheet, View, Alert } from "react-native"
import myModule from "./array"

const Home = ({route, navigation}) => {
  // console.log(localStorage.getItem("inputs"))
    let loggedIn = false
    let tokenData = undefined
    let userName = undefined
    if(route.params){
      // console.log(route.params)
      const {token, isLoggedIn, username} = route.params
      tokenData = token
      userName = username
      if(isLoggedIn == true){
        loggedIn = true
      }
    }
    // const {token} = route.params
    // const {isLoggedIn} = route.params
    // if(isLoggedIn == true){
    //   loggedIn = true
    // }
    // console.log(token)
    const getThisMonthFeed = () => {
      navigation.navigate('UpComingBirthDays', {
        token : tokenData,
        username : userName
      })
    }

    const feedForm = () => {
      navigation.navigate('FeedForm', {
        token : tokenData,
        username : userName
      })
    }

    const logout = async() => {
      loggedIn = false
      const res = await axios.get('http://192.168.29.184:8085/logout', {
        headers:{
          'bayBae1779': ''
        }
      })
      if(res.status === 200){
        Alert.alert("You have logged out")
        navigation.navigate('Home', {
          isLoggedIn : false
        })
      }
    }
    return (
      <View style={styles.container}>
        {
          loggedIn?
        <View style={styles.indView}>
            <Button style={styles.buttonStyle} onPress={() => getThisMonthFeed()} title="Get This Month's Feed" />
            <Button style={styles.buttonStyle} onPress={() => feedForm()} title="Feed Form" />
            {/* {console.log(inputs)} */}
            <Button style={styles.buttonStyle} onPress={()=>logout()} title="Logout" />
        </View>
        :
        <View style={styles.indView}>
          <Button style={styles.buttonStyle} onPress={()=>navigation.navigate('Login')} title="Login" />
          <Button style={styles.buttonStyle} onPress={()=>navigation.navigate('Register')} title="Register" />
          </View>
        }
      </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection : 'row',
      padding : 40},
    imageStyle : {
      width: 400,
      height: 200
    },
    buttonStyle : {
      margin: 50 ,
  width: 400,
  height: 120
    },
    indView : {
      margin: 50 ,
  width: 400,
  height: 40,
  flexDirection : 'row'
    }
  });
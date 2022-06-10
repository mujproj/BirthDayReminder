import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native"
import { useState } from "react"
import axios from "axios"

const Login = ({navigation}) => {

    const [state, setState] =  useState({
        username: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [errorArray, setErrorArray] = useState({
        username: "",
        password: ""
    })

    const handleInput = name => value => {
        setState({...state, [name]:value})
    }

    const onSubmit = async () => {
        // console.log("ho")
        try{
            
            if(state.username.length < 1){
                setErrorArray({username: "Username should be minimum of 3 characters"})
            }else{
            const res = await axios.post('http://192.168.29.184:8085/login',state)
            if(res.status === 200){
                // Alert.alert(res.data.token)
                navigation.navigate('Home', {
                    token: res.data.token,
                    isLoggedIn : true,
                    username : state.username
                })
            }
            else if(res.status === 400){
                console.log(res)
            }
        }
        }catch(err){
            console.log(">>>",err)
            
                // console.log(err.response.data)
            setErrorMessage(err.response.data)
        }
        
        
    }

    return (
        <View style={styles.container}> 
            <Text style={{color:'red'}}>{errorMessage}</Text>
            <Text style={{color: 'red'}}>{errorArray.username}</Text>
            <Text>Username</Text>
            <TextInput placeholder="Enter your username" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.username} onChangeText={handleInput("username")} name="username" />
            <Text style={{color: 'red'}}>{errorArray.password}</Text>
            <Text>Password</Text>
            <TextInput placeholder="Enter your password" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.password} onChangeText={handleInput("password")} secureTextEntry={true} />
            <Button onPress={onSubmit} title="Login" disabled={
                !(state.username.length && state.password.length)
            } />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle : {
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.3)",
        paddingHorizontal : 105,
        paddingVertical : 7,
        borderRadius : 1,
        fontSize : 18,
        
    },
    buttonStyle : {
        padding : 200,
        height : 45
    }
})
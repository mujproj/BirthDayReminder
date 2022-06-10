import { Button, Text, TextInput, View, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import axios from "axios"

const Register = ({navigation}) => {
    const [state, setState] = useState({
        username : "",
        password : "",
        email : "",
        mobileNumber : "",
        firstName : "",
        lastName : ""
    })

    const [cpassword, setCPassword] = useState("")

    const [errorArray , setErrorArray] = useState({
        username : "",
        password : "",
        cpassword : "",
        email : "",
        mobileNumber : ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    const handleInput = name => value => {
        setState({...state, [name]:value})
    }

    const onSubmit = async() => {
        try{
            // console.log("Hurray, You have submitted", state)
            
            if(state.username.length < 3){
                // setErrorArray({})
                // setErrorMessage("Minimum Length Should be 4 characters")
                setErrorArray({username : "Username should be minimum of 3 characters"})
            // }else if(!(state.password.match(/(?=.*?[A-Z])/)).match(/(?=.*?[a-z])/).matches(/(?=.*?[0-9])/).matches(/(?=.*?[#?!@$%^&*-])/)){
            }else if(!(state.password.match(/(?=.*?[A-Z])/) && state.password.match(/(?=.*?[a-z])/) && state.password.match(/(?=.*?[0-9])/) && state.password.match(/(?=.*?[#?!@$%^&*-])/) && state.password.length >= 8)){
                // setErrorMessage("Please follow Password setting rules")
                setErrorArray({password : "Please follow password validation policy"})
            }else if(!(cpassword.match(/(?=.*?[A-Z])/)  && cpassword.match(/(?=.*?[a-z])/) && cpassword.match(/(?=.*?[0-9])/) && cpassword.match(/(?=.*?[#?!@$%^&*-])/) && cpassword.length >= 8)){
                setErrorArray({cpassword: "Please follow password validation policy"})
            }else if(cpassword !== state.password){
                setErrorMessage("Password & Confirm Password don't match")
            }
            else if(!(state.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))){
                // setErrorMessage("Please Enter a valid Email only")
                setErrorArray({email : "Please Enter a valid Email only"})
            }else if(!(state.mobileNumber.match(/^\d{10}$/))){
                setErrorArray({mobileNumber : "Please enter a valid Mobile Number"})
            }
            else{
                setErrorMessage("")
                setErrorArray({})
            const res = await axios.post('http://192.168.29.184:8085/register', state)
            if(res.status === 200){
                Alert.alert(res.data)
                navigation.navigate('Login')
            }}
        }catch(err){
            console.log(err)
            if(err.response.status === 400){
                console.log(err.response.data)
                if(typeof(err.response.data) == "object"){
                    err.response.data.map(e => {
                        if(e.param === "email")
                            setErrorArray({email: e.msg})
                        if(e.param === "password")
                            setErrorArray({password: e.msg})
                        if(e.param === "mobileNumber")
                            setErrorArray({mobileNumber: e.msg})
                        if(e.param === "username")
                            setErrorArray({username: e.msg})
                    })
                }
                else if(typeof(err.response.data) === "string"){
                    setErrorMessage(err.response.data)
                }
                else {
                    setErrorMessage("Some Technical Error.  Please try after sometime")
                }
            }    
        }
        
    }

    return (
        <View style={styles.container}> 
            <Text style={{color: 'red'}} >{errorMessage}</Text>
            <Text style={{color: 'red'}} >{errorArray.username}</Text>
            <Text>Username</Text>
            <TextInput placeholder="Enter your username" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.username} onChangeText={handleInput("username")} name="username" />
            
            <Text style={{color: 'red'}} >{errorArray.email}</Text>
            <Text>Email</Text>
            <TextInput placeholder="Enter your email" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.email} onChangeText={handleInput("email")} keyboardType="email-address" />
            <Text style={{color: 'red'}} >{errorArray.mobileNumber}</Text>
            <Text>Mobile Number</Text>
            <TextInput placeholder="Enter your mobileNumber" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.mobileNumber} onChangeText={handleInput("mobileNumber")} keyboardType="numeric" />
            <Text>First Name</Text>
            <TextInput placeholder="Enter your First Name" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.firstName} onChangeText={handleInput("firstName")} />
            <Text>Last Name</Text>
            <TextInput placeholder="Enter your Last Name" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.lastName} onChangeText={handleInput("lastName")} />
            <Text style={{color: 'red'}} >{errorArray.password}</Text>
            <Text>Password</Text>
            <TextInput placeholder="Enter your password" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.password} onChangeText={handleInput("password")} secureTextEntry={true} />
            <Text style={{color: 'red'}} >{errorArray.cpassword}</Text>
            <Text>Confirm Password</Text>
            <TextInput placeholder="Please Confirm Your Password" style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} value={cpassword} onChangeText={(e)=>{setCPassword(e)}} secureTextEntry={true} />
            <Button onPress={onSubmit} title="Register" disabled={
                !(state.username && state.password && state.email && state.mobileNumber && state.firstName && state.lastName && cpassword)
            } />
        </View>
    )
}

export default Register

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
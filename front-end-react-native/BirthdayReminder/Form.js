import { View, Text, TextInput, StyleSheet, Button, Alert, SafeAreaView } from "react-native"
import { useState, createContext } from "react"
import DatePicker from 'react-native-datepicker';
import myModule from "./array";
import axios from "axios";



export const DataContext = createContext('');
const Form = ({route, navigation}) => {
    const [state, setState] = useState({
        user : "",
        personName : "",
        personDOB : "",
        personEmail : ""
    })

    
    const [errorArray , setErrorArray] = useState({
        personName: "",
        personDOB: "",
        personEmail: ""
    })
    const {username, token} = route.params

    const [inputs, setInputs] = useState({})

    const handleInput = name => value => {
        state.user = username
        setState({...state, [name]:value})
        
    }
    const onSubmitForm = async(e) => {
        if(state.personEmail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrorArray({personEmail: "Please Enter a valid Email Address"})
        }
        // window.alert(state.personDOB)
        // console.log(state.user)
        // console.log(state)
        setErrorArray({})
        e.preventDefault()
        // var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
        // let personAge = Math.floor((Date.now(currentDate) - new Date(state.personDOB))/31557600000)
        // console.log("<<<<<<<>...",personAge)
        
    //    setInputs(oldData => {return ({...oldData})})
    //    console.log(inputs)
    // console.log(oldData)
    // myModule.push(state)
    // localStorage.setItem("inputs", JSON.stringify(myModule))
    // console.log("...",JSON.stringify(state))
    
    //    console.log(Inputs)
    // console.log(JSON.stringify(myModule))
        try{
        const res = await axios.post('http://192.168.29.184:8085/feed/feedForm', state, {
            headers: {
                'bayBae1779': token
            }
        })

        if(res.status === 200){
            Alert.alert(res.data)
            navigation.navigate('Home', {
                username,
                token,
                isLoggedIn : true
            })
        }
    }catch(err){
        console.log(err.response.data)
        if(err.response.status === 400){
            console.log(err.response.data)
            if(typeof(err.response.data) == "object"){
                err.response.data.errorMessage.map(e => {
                    console.log("here")
                    if(e.param === "personName")
                        setErrorArray({personName: e.msg})
                    if(e.param === "personDOB")
                        setErrorArray({personDOB: e.msg})
                    if(e.param === "personEmail")
                        setErrorArray({personEmail : e.msg})
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
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TextInput autoCapitalize="none" autoComplete={false} autoCorrect={false} value={state.user} onChangeText={handleInput("user")} name="username" style={{height: 0}} />
            <Text style={{color: 'red'}}>{errorArray.personName}</Text>
            <Text>Person's Name</Text>
            <TextInput style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} placeholder="Enter Person's Name to remember" value={state.personName} onChangeText={handleInput("personName")} name="personName" />
            <Text style={{color: 'red'}}>{errorArray.personDOB}</Text>
            <Text>Person's DOB</Text>
            {/* <TextInput style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} placeholder="Enter Person's DOB" value={state.personDOB} onChangeText={handleInput("personDOB")} name="personDOB" /> */}

            <DatePicker
          style={styles.datePickerStyle}
          date={state.personDOB} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="yyyy/MM/DD"
          minDate="1900/01/01"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setState({user: username, personDOB : date, personEmail: 
                state.personEmail, personName: state.personName})
          }}
        />

        {/* <DatePicker  onDateChange={date => {setState({personDOB : date})}} /> */}
{/* onDateChange={(date) => {
            setState({personDOB: date});
          }} */}
            <Text style={{color: 'red'}}>{errorArray.personEmail}</Text>
            <Text>Person's Email</Text>
            <TextInput style={styles.inputStyle} autoCapitalize="none" autoComplete={false} autoCorrect={false} placeholder="Enter Person's Email" value={state.personEmail} onChangeText={handleInput("personEmail")} name="personEmail" keyboardType="email-address" />
            <Button onPress={onSubmitForm} style={styles.buttonStyle} title="Add Feed" disabled = {
                !state.user || !state.personEmail || !state.personName || !state.personDOB
            }/>
        </View>
        </SafeAreaView>
    )
}

export default Form

const styles = StyleSheet.create({
    container : {
        flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    },
    datePickerStyle: {
        width: 230,
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
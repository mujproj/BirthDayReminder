import { StyleSheet, Text, TextInput, View, FlatList, Image } from "react-native"
import { useEffect, useState } from "react"
import axios from "axios"


const FeedData = ({route}) => {
    
    const[feedData, setFeedData] =useState([])
    useEffect(async() => {

        const {token, username} = route.params
        let res = await axios.get(`http://192.168.29.184:8085/feed/getFeedFormData/${username}`, {
            headers: {
                'bayBae1779': token
            }
        })
        if(res.status === 200){
        //    console.log(res.data.feeds)
        let arr = []
        res.data.feeds.map(e => {
            if(parseInt(e.personDOB.split("T")[0].split("-")[1]) === (new Date().getMonth() + 1))
                if(parseInt(e.personDOB.split("T")[0].split("-")[2]) > (new Date().getDay()))
                    arr.push(e)
        })
        setFeedData(arr)
        // console.log(feedData)
        }
        // window.location.reload()
    }, [])

    const birthDates = e => {
        const year = e.split("T")[0].split("-")[0]
        console.log(year)
        const birthMonth = e.split("T")[0].split("-")[1]
        console.log("22...", birthMonth)
        const day = parseInt(e.split("T")[0].split("-")[2])
        console.log("333..",day)

        let allMonths = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

        const month = allMonths[(parseInt(birthMonth) - 1)]
        // console.log("...MM", monthLong)
        return `${day} ${month} ${year}`
    }
    // console.log(feedData)
    return (
        <View style={styles.container}>
            {feedData.length > 0 ? 
            <FlatList data = {feedData} keyExtractor={i => i._id} renderItem={({item}) => {
                return (
                    <View style={styles.container} >
                        {/* <Image source={{
                        uri : item.image
                        }} style={styles.imageStyle} 
                        /> */}
                        {/* <Text>ID : {item._id}</Text> */}
                        <Image source={require('./assets/blank-user.png')} style={styles.imageStyle} />
                        <View style={styles.textContainer}>
                            <Text>Name : {item.personName} </Text>
                            <Text>AGE : {Math.ceil(((Date.now(new Date().toJSON().slice(0,10)+' 01:00:00') - new Date(item.personDOB))/31557600000))}</Text>
                            <Text>Email : {item.personEmail}</Text>
                            <Text>BirthDate : {item.personDOB}</Text>
                            <Text>BDAY : {birthDates(item.personDOB)}</Text>
                        </View>
                    </View>
                )
            }}
            showsVerticalScrollIndicator={false} /> :
            <View style={styles.container} ><Text>Looks Like no data present or Wait for sometime</Text></View>}
            
        </View>
    )
}

export default FeedData

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
    textContainer:{
        justifyContent : "center",
        alignItems:'flex-start',
        padding: 20
    },
    buttonStyle : {
        padding : 200,
        height : 45
    },
    imageStyle:{
        height: 200,
        width: 200,
        padding: 4
    }
})
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import * as d from './data'
import Form from "./Form";
import { useContext } from "react"
import { DataContext } from "./Form"


const BirthDays = () => {
    const {inputs} = useContext(DataContext)
    const data = d.default
    let arr = []
    data.map(ele => {
        if(parseInt(ele.birthDate.split('-')[1]) === new Date().getMonth() + 1){
            if(parseInt(ele.birthDate.split('-')[0]) > new Date().getDay())
                 arr.push(ele)
        }
      })
      console.log(inputs)
    return (
        <View style={styles.container}>
            {arr.length > 0 ? 
                <FlatList data = {arr} keyExtractor={i => i.id} renderItem={({item}) => {
                    return (
                        <View style={styles.container} >
                            <Image source={{
                            uri : item.image
                            }} style={styles.imageStyle} 
                            />
                            <Text>ID : {item.id}</Text>
                            <Text>Name : {item.name} </Text>
                            <Text>AGE : {item.age}</Text>
                            <Text>Email : {item.email}</Text>
                            <Text>BirthDate : {item.birthDate}</Text>
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false} />
                :
                <View style={styles.container}><Text>Sorry No Data Available</Text></View>
            }
            
        </View>
    )
}

export default BirthDays

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      color : 'blue'
    },
    imageStyle : {
      width: 400,
      height: 200
    }
  });
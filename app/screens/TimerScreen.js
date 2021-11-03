import React from 'react';
import { Image, StyleSheet, View, ScrollView, Text, TextInput, FlatList, Button} from 'react-native';
import colors from '../config/colors'

function TimerScreen({navigation}) {

    const [timerTime, setTimer] = React.useState(null)

    const [timerId, setTimerId] = React.useState(0)

    const [timerActive, setActive] = React.useState(false)
    
    const [timers, addTimer] = React.useState([])


    const renderItem = ({ item }) => (
        <View>
            <View style={styles.item}>
                <Text>Timer id: {item.key}</Text>
                <Text style={styles.title}>Timer time:{item.time}</Text>   
            </View>
            <Button title="Remove Timer" style={styles.buttonToRemoveTimer} onPress={()=>handleRemove(item.key)}/>
            
        </View>
        );
   
    function handleRemove(key){
        const newList = timers.filter((item) => item.key !== key)
        addTimer(newList)
    }

    function timeSetFunctions(){
        setActive(true);
        setTimerId(timerId + 1)
        createTimer(); 
        setTimer("");
    }

    function createTimer(){
        
        addTimer(timers => [...timers, {key: timerId, time: timerTime}]);
        
        console.log(timers)
    }



    return (
           
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={setTimer}
            keyboardType="numeric"
            
            placeholder="Set Timer in Seconds"
            value={timerTime}
            onSubmitEditing={timeSetFunctions}
            />
            <View style={timerActive ? styles.timerActivated : styles.timerDeactivated}>
                <Text style={{fontSize:20, marginBottom:10 }}>Your set timer</Text>
            </View>
            <FlatList
            data={timers}
            renderItem={renderItem}
            keyExtractor={item => item.time}
            />
        </View>
          
    );
}
const styles = StyleSheet.create({
    buttonToRemoveTimer:{
        marginBottom:20,
        paddingBottom:20,
        marginHorizontal:5,
        color:"red"

    },
    container:{
        backgroundColor:"white",
        flex:1
    },
    image:{
        width:"100%", 
        height:"100%"
    }, 
    input:{
       borderWidth:1, 
       height:40, 
       margin:12, 
       padding:10
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 0,
        marginHorizontal: 16,
    },
    timerActivated:{
        display:"flex",
        marginLeft:10
        
    }, 
    timerDeactivated:{
        display:"none"
    }, 
    title: {
        fontSize: 32,
    },
});

export default TimerScreen;
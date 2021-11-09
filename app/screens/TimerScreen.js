import React, { createRef} from 'react';
import { Image, StyleSheet, View, ScrollView, Text, TextInput, FlatList, Button, TouchableHighlight} from 'react-native';
import colors from '../config/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TimerScreen({navigation}) {

    const [timer, setTimer] = React.useState(null)

    const [id, setId] = React.useState(0)
    
    const [timers, editTimerList] = React.useState([])

    const [timersRunning, setTimerRunning] = React.useState(false)

    const [selectedId, setSelectedId] = React.useState(null)

    const [timeRemaining, setTimeRemaining] = React.useState(null)

    const Item = ({item, onPress, backgroundColor, color}) => (
        
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[color]}>Timer's Number: {item.key}</Text>
            <Text style={[styles.title, color]}>Timer's Time: {item.time}</Text>
            <Button title="Remove Timer" onPress={()=>handleRemove(item.key)}/>
        </TouchableOpacity>
    );

    var startOrStopTimers = timersRunning ? "Stop Timers": "Start Timers"


    const renderItem = ({ item }) => {

        const backgroundColor = item.key === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.key === selectedId ? 'white' : 'black'; 

        return(
         <Item
            item={item}
            onPress={()=>setSelectedId(item.key)}
            backgroundColor={{backgroundColor}}
            color={{color}}
        />
        );
    }

    function getTimerCountDown(){
        setTimeout(()=>{
            setTimeRemaining(this.getTimeRem()-1)}, 1000);
    }

    function getTimeRem() {
        return this.state.timeRemaining;
    }
   
    function handleRemove(key){
        const newList = timers.filter((item) => item.key !== key)
        editTimerList(newList)
    }


    function addTimerToList(){
        editTimerList(timers.concat([timer]));
        setId(id+1)
        console.log("Added Timer: ", timer)
        setTimer(null)
        console.log("Current Array of all Timers", timers)
    }

    function stopTimers(){
        setTimerRunning(!timersRunning)
        console.log("All Timers Stopped!")
    }


    async function startTimers(){

        setTimerRunning(!timersRunning)
        console.log("All Timers Started!")

        console.log(timers[0])
        // var newList
        // var currentTimer
        // var i = 0
        // while (timers.length > 0){
        //     currentTimer = timers[0]
        //     console.log(currentTimer.time)
        //     await Sleep(parseInt(currentTimer.time)*1000)
        //     console.log("Timer " + currentTimer.key +" Done!")
        //     newList = timers.filter(!currentTimer)
        //     editTimerList(newList)
        //     console.log("Updated timers:", timers)
        //     // Prevents infinite Loop
        //     i++
        //     if (i == 5)break;
        // }
    }
    function Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
       }


    return (      
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={(time)=>setTimer({key: id, time: time})}
            keyboardType="numeric"
            placeholder="Set Timer in Seconds"
            value={timer == null ? "" : timer.time}
            onSubmitEditing={()=>addTimerToList()}
            />
            <View style={timers.length > 0  ? styles.timerActivated : styles.timerDeactivated}>
                <Icon.Button
                name={timersRunning ? "pause" : "play"}
                backgroundColor="#3b5998"
                onPress={timersRunning?stopTimers:startTimers}
                >
                {startOrStopTimers}
                </Icon.Button>
                <Text style={{fontSize:20, marginTop:10 }}>Active Timers:</Text>
            </View>
            <FlatList
            data={timers}
            renderItem={renderItem}
            keyExtractor={item => item.key.toString()}
            extraData={selectedId}
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
        marginVertical: 10,
        marginHorizontal: 16,
    },
    timerActivated:{
        display:"flex",
        margin:15
        
    }, 
    timerDeactivated:{
        display:"none"
    }, 
    title: {
        fontSize: 32,
        padding:10
    },
});

export default TimerScreen;
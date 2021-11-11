import React from 'react';
import {StyleSheet, View, Text, TextInput, FlatList, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors'


function TimerScreen({navigation}) {

    const [invokedTimers, setInvokedTimers] = React.useState([])

    const [timeRemaining2, setTimeRemaining2] = React.useState(null)

    const [timer, setTimer] = React.useState(null)

    const [id, setId] = React.useState(0)
    
    const [timers, editTimerList] = React.useState([])

    const [timersRunning, setTimerRunning] = React.useState(false)

    const [selectedId, setSelectedId] = React.useState(null)

    const [timeRemaining, setTimeRemaining] = React.useState(null)

    const startOrStopTimers = timersRunning ? "Stop Timers": "Start Timers"
    

    const Item = ({item, onPress, backgroundColor, color}) => (
        
        <View style={[styles.item, backgroundColor]}>
            <Text style={[color]}>Timer's Number: {item.key}</Text>
            <Text style={[styles.title, color]}>Timer's Time: {item.time}</Text>
            <Button title="Remove Timer" onPress={()=>handleRemove(item.key)}/>
            <View style={{paddingTop: 15, width: 45, alignSelf:'center'}}>
            <Icon.Button
                name={item.isRunning ? "pause" : "play"}
                backgroundColor="#3b5998"
                onPress={item.isRunning ? ()=>stopTimer(item) : ()=>startTimer(item)}
            />
            </View>
        </View>
    );

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

    function handleRemove(key){
        const newList = timers.filter((item) => item.key !== key)
        editTimerList(newList)
    }

    function addTimerToList(){
        editTimerList(timers.concat([timer]));
        setId(id+1)
        setTimer(null)
        console.log("Current Array of all Timers: ", timers)
    }

    function startTimer(timer){
        let timerToUpate = timer
        let index = timers.findIndex(x=>x===timerToUpate)
        timers.forEach(element => {
            element.isRunning=false
        });
        timers[index].isRunning = true
        editTimerList(timers)
        countDown(timer)
    }
    
    function countDown(timerObject){
        for(i = timeInSeconds; i > 0; i++){
            setIntervall(()=>setTimeRemaining2(timerObject.remainingTime-1), 1000)    
        }    
        setInvokedTimers(...invokedTimers, timerObject)
    }
    
    function stopTimer(timerKey){
        let timerToUpate = timers.find(x=>x.key===timerKey)
        let index = timers.findIndex(x=>x===timerToUpate)
        timers[index].isRunning = false
        
        editTimerList(timers)
    }

    
    const createClock2 = setIntervall(countDown, 1000)
    
    function startTimers(){
        
    }
    function stopTimers(){
        setTimerRunning(!timersRunning)
        console.log("All Timers Stopped!")
    }

    function displayTime() {
        let date = new Date();
        let time = date.toLocaleTimeString();
        setTimeRemaining(time)
     }
     
    const createClock = setInterval(displayTime, 1000);


    return (      
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={(time)=>setTimer({key: id, time: time, remainingTime: time, isRunning: false})}
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
            //extraData={selectedId}
            />
            <View><Text>{timeRemaining}</Text></View>
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
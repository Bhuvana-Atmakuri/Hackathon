import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';

//Screens

import Contacts from './screens/Contacts'
import Home from './screens/Home'
import Tutorials from './screens/Tutorials';
import SosAlert from './screens/SosAlert';

//screen names
const contact = 'Contacts';
const home = 'Home';
const tutorial = 'Tutorials';
const sosAlert = 'SosAlert';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName={home}
                screenOptions={({route}) => ({
                    tabBarIcon:({focused,color, size}) => {
                        let iconName;
                        let rn = route.name;
                        let Isize = 25;

                        if (rn === contact){
                            iconName = focused?'call':'call-outline'
                        }

                        else if (rn === home){
                            iconName = focused?'home':'home-outline' 
                        }

                        else if (rn === tutorial){
                            iconName = focused?'logo-youtube':'logo-youtube'
                        }

                        else if (rn === sosAlert){
                            iconName = focused?'stop-circle':'stop-circle-outline'
                        }

                        return <Ionicons name = {iconName} size ={Isize} color={focused ? '#71C9CE' : '#71C9CE'} />
                    }, 
                })}
                tabBarOptions = {{
                    activeTintColor : '#71C9CE',
                    inactiveTintColor :'#71C9CE',
                    labelStyle :{ paddingBottom : 10, fontSize : 10},
                    style :{padding : 10, height:100}
                }}
                sceneContainerStyle={{ backgroundColor: '#71C9CE' }} 
                tabBarStyle = {{backgroundColor: '#A6E3E9'}}
                >

                <Tab.Screen name = {home} component={Home}/>    
                <Tab.Screen name = {contact} component={Contacts}/>
                <Tab.Screen name = {tutorial} component={Tutorials}/>
                <Tab.Screen name = {sosAlert} component={SosAlert}/>

                </Tab.Navigator>
            </NavigationContainer>
       
    );
}

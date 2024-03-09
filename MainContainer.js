import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';

//Screens

import Contacts from './screens/Contacts'
import Sos from './screens/Sos'
import tutorials from './screens/Tutorials'
import Tutorials from './screens/Tutorials';

//screen names
const contact = 'Contacts';
const sos = 'SOS';
const tutorial = 'Tutorials';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName={sos}
                screenOptions={({route}) => ({
                    tabBarIcon:({focused,color, size}) => {
                        let iconName;
                        let rn = route.name;
                        let Isize = 25;

                        if (rn === contact){
                            iconName = focused?'call':'call-outline'
                        }

                        else if (rn === sos){
                            iconName = focused?'stop-circle':'stop-circle-outline' 
                        }

                        if (rn === tutorial){
                            iconName = focused?'logo-youtube':'logo-youtube'
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
                <Tab.Screen name = {contact} component={Contacts}/>
                <Tab.Screen name = {sos} component={Sos}/>
                <Tab.Screen name = {tutorial} component={tutorials}/>

                </Tab.Navigator>
            </NavigationContainer>
       
    );
}
import * as React from 'react';
import {View, Text} from 'react-native';

export default function Sos({NavBar}) {
    return(
        <View style = {{flex:1, alignItems :'center',justifyContent:'center'}}>
            <Text onPress={() => alert('SOS')}
            style = {{fontSize:26,fontWeight:'bold'}}> SOS
            </Text>
        </View>
    );
}
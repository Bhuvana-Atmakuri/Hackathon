import { View, Text, Image, TouchableOpacity} from 'react-native'
import * as WebBrowser from "expo-web-browser";
import React from 'react'
import girl from './../assets/images/girl.png'
import logo from './../assets/images/logo.png'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function LoginSection() {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style = {{display:'flex', alignItems:'center'}}>
      <Image source = {girl}
      style = {{width :250, height:500,
        objectFit:'contain', marginTop:-50}}/>

        <View style = {{
            height:600,
            backgroundColor:'#71C9CE',
            width:'100%',
            marginTop:-70,
            padding:20
        }}>
            
            <Text style = {{textAlign:'center', fontSize:40, color :'black',marginTop:50}}>SHE SAFETY</Text>
            <Text style = {{textAlign:'center', fontSize:22 ,  color :'black', marginTop:10}}>Stay Vigilant, Stay Safe with our women-centric safety app</Text>

            <TouchableOpacity 
            onPress={onPress}
            style = {{backgroundColor:'#E3FDFD' ,display:'flex' , flexDirection:'row',alignItems:'center',gap:10, padding:0, borderRadius:99, marginTop:30}}>
                <Image source={logo} style = {{width:60, height:60}}/>
                <Text style = {{fontSize:28, color:'#71C9CE'}}>Sign In with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
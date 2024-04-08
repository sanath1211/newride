import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress=async()=>{
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
  }
  return (
    <View style={{display:'flex'}}>
      <Image source={require('../../../assets/images/CurvyroadsLogo.png')} style={{height:130,width:150,zIndex:1,left:125}}/>
      <Image source={require('../../../assets/images/toyota.png')} style={{height:'50%',width:'110%',marginLeft:-200}}/>
        <Text style={{fontWeight:'900',fontSize:24,color:'white',paddingLeft:10,marginTop:10}}>Your Ultimate Trip </Text>
        <Text style={{fontWeight:'900',fontSize:24,color:'white',paddingLeft:10}}>Planner Application</Text>
        <Text style={{paddingTop:10,fontSize:14,color:'white',paddingLeft:10}}>Find the best route throughout </Text>
        <Text style={{paddingTop:5,fontSize:14,color:'white',paddingLeft:10}}>your journey and so much</Text>
        <Text style={{paddingTop:5,fontSize:14,color:'white',paddingLeft:10}}>more in just one click</Text>

        <TouchableOpacity  style={{flexDirection:'row', backgroundColor:'#FF5900',padding:16,display:'flex',borderRadius:99,marginTop:40, width:350, justifyContent:'center',paddingLeft:10,marginLeft:15}} onPress={onPress}>
            <Text style={{paddingTop:-2,fontSize:15,fontWeight:'600'}}> Login with Google</Text>
        </TouchableOpacity>
    </View>
   
  )
}
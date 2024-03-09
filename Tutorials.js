import * as React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import { getTutorialList } from '../../Services';

export default function Tutorials({NavBar}) {

    const [tutorialList, setTutorialList] = React.useState([]);
    React.useEffect(() =>{
        getTutorial();
    },[])

    const getTutorial = () =>{
        getTutorialList().then(resp =>{
            console.log("Response : ",resp);
            setTutorialList(resp?.tutorials)
        })
    }
    
    return(
        <View style = {{backgroundColor: '#71C9CE'}}>
            <Text style = {{
                fontSize:25,
                color:'#E3FDFD',
                alignItems:'center',
            }}> Self Defense Tutorials </Text>
            <FlatList
                data = {tutorialList}
                key = {tutorialList.id}
                renderItem={({item}) => (
                    <View style = {{padding:10,  alignItems:'center', marginBottom : 15, marginHorizontal:20, borderRadius: 20, backgroundColor:'#E3FDFD'}}>
                        <Image source = {{uri : item?.banner?.url}}
                        style = {{width :300, height:190, alignItems:'center', borderRadius:15}}/>
                    </View>
                )}
            />
        </View>
    );
}
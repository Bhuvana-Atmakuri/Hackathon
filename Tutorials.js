import * as React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Linking} from "react-native";
import { getTutorialList } from "../../Services";
import { Ionicons } from "@expo/vector-icons";

export default function Tutorials({ NavBar }) {
  const [tutorialList, setTutorialList] = React.useState([]);
  React.useEffect(() => {
    getTutorial();
  }, []);

  const getTutorial = () => {
    getTutorialList().then((resp) => {
      console.log("Response : ", resp);
      setTutorialList(resp?.tutorials);
    });
  };

  const openYouTubeLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={{ backgroundColor: "#71C9CE" , paddingVertical: 10}}>
      <Text
        style={{
          fontSize: 28,
          color: "#E3FDFD",
          textAlign: "center",
        }}
      >
        {" "}
        Self Defense Tutorials{" "}
      </Text>
      <FlatList
        data={tutorialList}
        key={tutorialList.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => openYouTubeLink(item?.link)}
            style={{
              padding: 10,
              marginBottom: 15,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "#E3FDFD",
              alignItems:"center",
            }}
          >
            <Image
              source={{ uri: item?.banner?.url }}
              style={{
                width: 300,
                height: 180,
                borderRadius: 15,
                
              }}
            />
            <View style={{ flex:1}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                 
                  flexDirection : 'row',
                  alignContent:'center',
                  marginTop: 5,
                }}
              >
                <Ionicons name="hourglass-outline" size={18} color="black" />
                <Text>{item?.time}</Text>
              </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

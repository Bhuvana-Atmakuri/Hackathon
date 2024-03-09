import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
    return (
        <LinearGradient
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <Image
                source={require("../assets/hero.jpg")}
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 20,
                }}
            />

            {/* content  */}
            <View style={{
                paddingHorizontal: 22,
                alignItems: 'center',
                marginTop: 50,
                width: "100%"
            }}>
                <Text style={{
                    fontSize: 50,
                    fontWeight: '800',
                    color: COLORS.white,
                    textAlign: 'center'
                }}>Let's Get Started</Text>

                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white,
                        marginVertical: 4,
                        textAlign: 'center'
                    }}>Stay vigilant, stay safe</Text>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white,
                        textAlign: 'center'
                    }}>with our women-centric safety app.</Text>
                </View>

                <Button
                    title="Join Now"
                    onPress={() => navigation.navigate("Signup")}
                    style={{
                        marginTop: 22,
                        width: "100%"
                    }}
                />

                <View style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white
                    }}>Already have an account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            fontWeight: "bold",
                            marginLeft: 4
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome;

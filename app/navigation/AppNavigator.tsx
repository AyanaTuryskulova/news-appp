import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    title: string;
    body: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Новости" }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Детали" }} />
    </Stack.Navigator>
  );
}

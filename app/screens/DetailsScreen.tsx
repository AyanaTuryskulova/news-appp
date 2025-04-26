import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
    const route = useRoute<DetailsRouteProp>();
    const { title, body, imageUrl } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            ) : null}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    body: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
    },
});

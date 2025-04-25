import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface Post {
    id: number;
    title: string;
    body: string;
}


export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
      fetchPosts();
    }, []);
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setPosts(response.data);
      } catch (err) {
        setError("Не удалось загрузить актуальные новости(");
      } finally {
        setLoading(false);
      }
    };
  
    const renderItem = ({ item }: { item: Post }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Details', {
          title: item.title,
          body: item.body,
        })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body.slice(0, 50)}...</Text>
      </TouchableOpacity>
    );
  
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size='large' color='#007AFF' />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 20,

    },
    item: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14, 
        color: 'gray',
        marginTop: 5,
    },
});
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

interface Post {
  title: string;
  description: string;
  urlToImage: string;
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
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          pageSize: 30,
          apiKey: '5e165254d12e40e79677d025e5651712',
        },
      });
   
      setPosts(response.data.articles.filter((item: Post) => item.urlToImage));
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить новости с NewsAPI");
    } finally {
      setLoading(false);
    }
  };
  

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', {
        title: item.title,
        body: item.description ?? 'Нет описания',
        imageUrl: item.urlToImage ?? '', 
      })}
    >
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.noImagePlaceholder} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={2}>{item.description?.slice(0, 50)}...</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
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
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3} 
        key={3} 
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
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 40,
  },
  item: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    maxWidth: '31%', 
  },
  image: {
    width: '100%',
    aspectRatio: 1, 
    backgroundColor: '#eee',
  },
  noImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ccc',
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  body: {
    fontSize: 10,
    color: '#666',
  },
});

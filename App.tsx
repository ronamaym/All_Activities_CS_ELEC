import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Activity 5: Fetching External Data (Single-Screen Exercise)
      </Text>
      <Text style={styles.headerSubtitle}>MY Example Shopping API</Text>
    </View>
  );
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=15');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.center}>
          <Text style={styles.error}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  list: {
    padding: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#eee',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2a7a2a',
  },
});

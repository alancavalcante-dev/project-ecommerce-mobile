import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const CATEGORIAS = {
  MASCULINO: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  FEMININO: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
};

export default function ProdutosScreen() {
  const [selectedTab, setSelectedTab] = useState<'MASCULINO' | 'FEMININO'>('MASCULINO');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useLocalSearchParams(); 
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [selectedTab]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setProducts([]);
    try {
      const categoriesToFetch = CATEGORIAS[selectedTab];
      const requests = categoriesToFetch.map(category => 
        axios.get(`https://dummyjson.com/products/category/${category}`)
      );
      const responses = await Promise.all(requests);
      const allProducts = responses.flatMap(response => response.data.products);
      setProducts(allProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <Link href={{ pathname: `/produtos/${item.id}`, params: { user } }} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'left',
          headerTitle: () => (
            <View>
              <Text style={styles.headerUsername}>Olá, {user}</Text>
              <Text style={styles.headerTitle}>Listagem dos produtos</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.replace('/')}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          ),
          headerBackVisible: false,
        }}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('MASCULINO')} style={styles.tabButton}>
          <Text style={[styles.tabText, selectedTab === 'MASCULINO' && styles.activeTabText]}>
            Produtos Masculinos
          </Text>
          {selectedTab === 'MASCULINO' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('FEMININO')} style={styles.tabButton}>
          <Text style={[styles.tabText, selectedTab === 'FEMININO' && styles.activeTabText]}>
            Produtos Femininos
          </Text>
          {selectedTab === 'FEMININO' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          renderItem={ProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  headerUsername: { fontSize: 14, color: '#666' },
  headerTitle: { fontSize: 17, fontWeight: 'bold' },
  logoutButton: { marginRight: 10, backgroundColor: '#dc3545', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5 },
  logoutText: { color: 'white', fontSize: 16 },
  tabContainer: { flexDirection: 'row', backgroundColor: 'white', elevation: 2 },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  tabText: { fontSize: 16, color: 'gray' },
  activeTabText: { color: '#007bff', fontWeight: 'bold' },
  activeTabIndicator: { height: 3, backgroundColor: '#007bff', marginTop: 5, borderRadius: 2, width: '100%' },
  loader: { flex: 1, justifyContent: 'center' },
  list: { paddingHorizontal: 8, paddingTop: 8 },
  card: { flex: 1, margin: 8, backgroundColor: 'white', borderRadius: 8, padding: 10, elevation: 3 },
  cardImage: { width: '100%', height: 120, resizeMode: 'contain', marginBottom: 10, borderRadius: 4 },
  cardTitle: { fontSize: 15, fontWeight: 'bold' },
  cardDescription: { fontSize: 12, color: 'gray', marginVertical: 4, height: 30 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 5 },
});

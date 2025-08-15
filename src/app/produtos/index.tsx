import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { fetchProductsByCategory, Product } from '../../services/api'; 
import ProductCard from './../components/ProductCard';

export default function ProdutosScreen() {
  const [selectedTab, setSelectedTab] = useState<'MASCULINO' | 'FEMININO'>('MASCULINO');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useLocalSearchParams(); 
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProductsByCategory(selectedTab);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, [selectedTab]);

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
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          ),
          headerBackVisible: false,
        }}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('MASCULINO')} style={styles.tabButton}>
          <Text style={[styles.tabText, selectedTab === 'MASCULINO' && styles.activeTabText]}>Produtos Masculinos</Text>
          {selectedTab === 'MASCULINO' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('FEMININO')} style={styles.tabButton}>
          <Text style={[styles.tabText, selectedTab === 'FEMININO' && styles.activeTabText]}>Produtos Femininos</Text>
          {selectedTab === 'FEMININO' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard item={item} user={user} />} 
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
});

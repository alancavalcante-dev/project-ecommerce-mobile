import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export default function ProductDetailScreen() {
  const { id, user } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!product) {
    return <Text style={styles.errorText}>Produto não encontrado.</Text>;
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'left',
          headerTitle: () => (
            <View>
              <Text style={styles.headerUsername}>Olá, {user}</Text>
              <Text style={styles.headerTitle}>Detalhes do produto</Text>
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
          headerBackTitle: 'Voltar',
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>R$ {product.price.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>R$ {originalPrice.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { textAlign: 'center', marginTop: 20, fontSize: 18, color: 'red' },

  // Estilos do Cabeçalho
  headerUsername: { fontSize: 14, color: '#666' },
  headerTitle: { fontSize: 17, fontWeight: 'bold' },
  logoutButton: { marginRight: 10, backgroundColor: '#dc3545', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5 },
  logoutText: { color: 'white', fontSize: 16 },

  // Restante dos estilos
  container: { paddingBottom: 20 },
  image: { width: '100%', height: 350, resizeMode: 'contain', backgroundColor: '#f8f8f8' },
  detailsContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  priceContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  currentPrice: { fontSize: 26, fontWeight: 'bold', color: '#e63946', marginRight: 10 },
  originalPrice: { fontSize: 18, color: 'gray', textDecorationLine: 'line-through' },
  description: { fontSize: 16, color: '#555', lineHeight: 24 },
});

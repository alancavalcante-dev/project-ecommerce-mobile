import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

interface ProductCardProps {
  user?: string | string[]; 
}

const ProductCard = ({ item, user }: ProductCardProps) => {
  return (
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
};

const styles = StyleSheet.create({
  card: { 
    flex: 1, 
    margin: 8, 
    backgroundColor: 'white', 
    borderRadius: 8, 
    padding: 10, 
    elevation: 3 
  },
  cardImage: { 
    width: '100%', 
    height: 120, 
    resizeMode: 'contain', 
    marginBottom: 10, 
    borderRadius: 4 
  },
  cardTitle: { 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  cardDescription: { 
    fontSize: 12, 
    color: 'gray', 
    marginVertical: 4, 
    height: 30 
  },
  cardPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginTop: 5 
  },
});

export default ProductCard;

import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export interface ProductDetails extends Product {
  discountPercentage: number;
  images: string[];
}

const CATEGORIAS = {
  MASCULINO: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  FEMININO: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
};


/**
 * Busca uma lista de produtos com base na categoria selecionada (Masculino/Feminino).
 * @param selectedTab A aba selecionada ('MASCULINO' ou 'FEMININO')
 * @returns Uma promessa que resolve para um array de produtos.
 */
export const fetchProductsByCategory = async (selectedTab: 'MASCULINO' | 'FEMININO'): Promise<Product[]> => {
  try {
    const categoriesToFetch = CATEGORIAS[selectedTab];
    const requests = categoriesToFetch.map(category => 
      axios.get(`https://dummyjson.com/products/category/${category}`)
    );
    const responses = await Promise.all(requests);
    const allProducts = responses.flatMap(response => response.data.products);
    return allProducts;
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return []; 
  }
};

/**
 * Busca os detalhes de um único produto pelo seu ID.
 * @param id O ID do produto a ser buscado.
 * @returns Uma promessa que resolve para os detalhes do produto ou null em caso de erro.
 */
export const fetchProductDetailsById = async (id: string | string[]): Promise<ProductDetails | null> => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do produto:", error);
    return null; // Retorna nulo em caso de erro
  }
};

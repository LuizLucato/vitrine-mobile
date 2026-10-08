/**
 * Arquivo responsável por armazenar os produtos de exemplo do aplicativo.
 *
 * Define uma lista fixa de produtos utilizada para simular um catálogo,
 * sem precisar realizar requisições a uma API.
 *
 * Funcionalidades:
 * - Armazenar os dados dos produtos utilizados nos testes.
 * - Garantir que os produtos sigam a estrutura definida pelo tipo Produto.
 * - Centralizar o endereço utilizado para carregar as imagens.
 *
 * Conceitos utilizados:
 * - Array de objetos: armazena vários produtos em uma única estrutura.
 * - Tipagem (Produto[]): garante que os itens sigam o tipo Produto.
 * - const: declara referências que não podem ser reatribuídas.
 * - Template literals: permitem inserir variáveis dentro de strings.
 */

import { Produto } from "@/types/produto";

// Endereço base utilizado para montar as URLs das imagens dos produtos.
const CDN = "https://cdn.dummyjson.com/product-images";

/**
 * Lista de produtos utilizada como base para os testes.
 *
 * Produto[] indica que o array deve conter objetos compatíveis
 * com o tipo Produto, definido em src/types/produto.
 *
 * export permite importar essa constante em outros arquivos.
 */
export const PRODUTOS: Produto[] = [
  {
    id: 1,
    title: "Mascara Lash Princess",
    description: "Rímel de volume.",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    brand: "Essence",
    category: "beauty",
    thumbnail: `${CDN}/beauty/essence-mascara-lash-princess/thumbnail.webp`,
    images: [],
  },
  {
    id: 2,
    title: "Eyeshadow Palette",
    description: "Paleta com 12 cores.",
    price: 19.99,
    discountPercentage: 5.5,
    rating: 3.28,
    stock: 44,
    brand: "Glamour",
    category: "beauty",
    thumbnail: `${CDN}/beauty/eyeshadow-palette-with-mirror/thumbnail.webp`,
    images: [],
  },
  {
    id: 3,
    title: "Chanel Coco Noir",
    description: "Perfume feminino.",
    price: 129.99,
    discountPercentage: 4.5,
    rating: 4.26,
    stock: 41,
    brand: "Chanel",
    category: "fragrances",
    thumbnail: `${CDN}/fragrances/chanel-coco-noir-eau-de/thumbnail.webp`,
    images: [],
  },
  {
    id: 4,
    title: "Annibale Colombo Sofa",
    description: "Sofá de três lugares.",
    price: 2499.99,
    discountPercentage: 3.2,
    rating: 4.48,
    stock: 47,
    brand: "Annibale Colombo",
    category: "furniture",
    thumbnail: `${CDN}/furniture/annibale-colombo-sofa/thumbnail.webp`,
    images: [],
  },
];

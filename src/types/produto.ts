/**
 * Define a estrutura dos produtos e as categorias disponíveis.
 * As interfaces e os tipos garantem a tipagem dos dados no TypeScript.
 */

export interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string; // O ? indica que a propriedade é opcional.
  category: string;
  thumbnail: string;
  images: string[];
}

// Union type: permite apenas os valores definidos abaixo.
export type CategoriaProduto =
  | "beauty"
  | "fragrances"
  | "furniture"
  | "groceries";

/**
 * Componente reutilizável responsável por exibir um produto no catálogo.
 *
 * Apresenta as informações resumidas do produto e permite
 * navegar para seus detalhes ou alternar seu estado de favorito.
 *
 * Conceitos utilizados:
 * - Props: recebem informações e funções do componente pai.
 * - Interface: define os tipos das propriedades recebidas.
 * - Callback: permite executar funções fornecidas pelo componente pai.
 * - memo: evita renderizações quando as props permanecem iguais.
 * - Renderização condicional: altera o ícone conforme o favorito.
 */

import { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Produto } from "@/types/produto";

/**
 * Define as propriedades obrigatórias do componente.
 *
 * produto: objeto com as informações do produto.
 * favorito: indica se o produto está marcado como favorito.
 * aoAlternarFavorito: função que recebe o ID para alterar o favorito.
 * aoAbrir: função que recebe o ID para abrir os detalhes do produto.
 */
interface CardProdutoProps {
  produto: Produto;
  favorito: boolean;
  aoAlternarFavorito: (id: number) => void;
  aoAbrir: (id: number) => void;
}

// Desestrutura as props recebidas do componente pai.
function CardProdutoBase({
  produto,
  favorito,
  aoAlternarFavorito,
  aoAbrir,
}: CardProdutoProps) {
  return (
    <View className="flex-row items-center gap-3 bg-slate-100 dark:bg-superficie rounded-card p-3">
      {/* Exibe a imagem do produto a partir de sua URL. */}
      <Image
        source={{ uri: produto.thumbnail }}
        className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-fundo"
      />

      {/* Executa a navegação passando o ID do produto selecionado. */}
      <Pressable
        onPress={() => aoAbrir(produto.id)}
        className="flex-1 active:opacity-70"
        accessibilityRole="button"
        accessibilityLabel={`Abrir ${produto.title}`}
      >
        <Text
          className="text-slate-900 dark:text-white text-[15px] font-semibold"
          numberOfLines={2}
        >
          {produto.title}
        </Text>

        {/* Utiliza "Sem marca" quando brand é null ou undefined. */}
        <Text className="text-slate-500 dark:text-suave text-xs mt-0.5">
          {produto.brand ?? "Sem marca"}
        </Text>

        {/* Formata o preço com duas casas decimais. */}
        <Text className="text-sky-700 dark:text-destaque text-[17px] mt-1.5">
          R$ {produto.price.toFixed(2)}
        </Text>
      </Pressable>

      {/* Alterna o estado de favorito utilizando a função recebida. */}
      <Pressable
        onPress={() => aoAlternarFavorito(produto.id)}
        accessibilityRole="button"
        accessibilityLabel={
          favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        className="min-w-[44px] min-h-[44px] items-center justify-center active:opacity-60"
      >
        {/* Exibe estrela preenchida ou vazia conforme o estado. */}
        <Text className="text-sky-600 dark:text-destaque text-2xl">
          {favorito ? "★" : "☆"}
        </Text>
      </Pressable>
    </View>
  );
}

// só redesenha quando alguma prop muda de verdade
// memo compara superficialmente as props e evita renderizações desnecessárias.
export const CardProduto = memo(CardProdutoBase);

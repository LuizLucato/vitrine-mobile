/**
 * Tela responsável por exibir os detalhes de um produto.
 *
 * Utiliza uma rota dinâmica do Expo Router para receber o ID
 * do produto selecionado no catálogo e buscar suas informações.
 *
 * Funcionalidades:
 * - Recuperar o ID do produto através dos parâmetros da rota.
 * - Buscar o produto correspondente na lista de produtos.
 * - Exibir uma mensagem caso o produto não seja encontrado.
 * - Apresentar imagem, nome, marca, categoria, preço e descrição.
 * - Exibir a quantidade em estoque e a avaliação do produto.
 * - Atualizar o título do cabeçalho com o nome do produto.
 *
 * Conceitos utilizados:
 * - useLocalSearchParams: recupera os parâmetros da rota atual.
 * - find: busca o primeiro elemento que atende a uma condição.
 * - Number: converte o ID recebido para um número.
 * - Renderização condicional: exibe conteúdos conforme a condição.
 * - Operador ?? : define um valor alternativo para dados ausentes.
 */

import { Image, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { PRODUTOS_TESTE } from "@/utils/gerarProdutos";

export default function DetalheProduto() {
  /**
   * Recupera o ID enviado pela rota dinâmica /produto/[id].
   *
   * O tipo { id: string } informa ao TypeScript que o parâmetro
   * esperado é uma string.
   *
   * Exemplo: ao acessar /produto/5, o ID recebido será "5".
   */
  const { id } = useLocalSearchParams<{ id: string }>();

  /**
   * Busca o produto correspondente ao ID recebido.
   *
   * find: retorna o primeiro produto que atende à condição.
   * Number(id): converte o ID de string para number.
   * ===: compara o valor e o tipo, sem conversão automática.
   *
   * A busca utiliza PRODUTOS_TESTE, a mesma lista do catálogo,
   * permitindo encontrar os produtos gerados para os testes.
   *
   * Se nenhum produto corresponder ao ID, find retorna undefined.
   */
  const produto = PRODUTOS_TESTE.find((p) => p.id === Number(id));

  /**
   * Renderização condicional para tratar produtos inexistentes.
   *
   * Se produto for undefined, exibe uma mensagem de erro
   * e interrompe a renderização do restante da tela.
   */
  if (!produto) {
    return (
      <View className="flex-1 bg-white dark:bg-fundo items-center justify-center p-4">
        <Text className="text-slate-900 dark:text-white text-center">
          Produto não encontrado.
        </Text>
      </View>
    );
  }

  return (
    // Permite rolar a tela caso o conteúdo ultrapasse a área visível.
    <ScrollView className="flex-1 bg-white dark:bg-fundo">
      {/* Define dinamicamente o título do cabeçalho da tela. */}
      <Stack.Screen options={{ title: produto.title }} />

      {/* Exibe a imagem do produto a partir de uma URL. */}
      <Image
        source={{ uri: produto.thumbnail }}
        className="w-full h-64 bg-slate-100 dark:bg-superficie"
        resizeMode="contain"
      />

      <View className="p-4">
        {/* Exibe o nome do produto selecionado. */}
        <Text className="text-slate-900 dark:text-white text-2xl font-bold">
          {produto.title}
        </Text>

        {/*
          Exibe a marca e a categoria do produto.

          O operador ?? retorna "Sem marca" quando brand
          possui valor null ou undefined.
        */}
        <Text className="text-slate-500 dark:text-suave text-sm mt-1">
          {produto.brand ?? "Sem marca"} · {produto.category}
        </Text>

        {/*
          Exibe o preço com duas casas decimais.

          toFixed(2) formata o número como uma string
          contendo exatamente duas casas decimais.
        */}
        <Text className="text-sky-700 dark:text-destaque text-3xl mt-4">
          R$ {produto.price.toFixed(2)}
        </Text>

        {/* Exibe a descrição completa do produto. */}
        <Text className="text-slate-600 dark:text-suave text-base mt-4 leading-6">
          {produto.description}
        </Text>

        {/* Exibe a quantidade disponível e a avaliação do produto. */}
        <Text className="text-slate-500 dark:text-suave text-xs mt-4">
          {produto.stock} em estoque · nota {produto.rating}
        </Text>
      </View>
    </ScrollView>
  );
}

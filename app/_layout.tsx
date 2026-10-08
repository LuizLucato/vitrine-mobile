/**
 * Layout raiz responsável pela estrutura principal do aplicativo.
 *
 * Configura a navegação entre os grupos de telas utilizando o
 * Stack do Expo Router e aplica as cores do tema claro ou escuro.
 *
 * Funcionalidades:
 * - Importar os estilos globais do NativeWind.
 * - Configurar a navegação principal utilizando Stack.
 * - Registrar os grupos de abas, autenticação e detalhes do produto.
 * - Identificar e aplicar o tema atual da aplicação.
 * - Sincronizar o tema na inicialização, especialmente no navegador.
 * - Configurar a aparência da barra de status.
 *
 * Conceitos utilizados:
 * - Stack: organiza a navegação em pilha.
 * - useColorScheme: identifica e permite alterar o tema.
 * - useEffect: executa um efeito após a renderização.
 * - Operador ?? : fornece um valor alternativo para null ou undefined.
 */

import "../global.css";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutRaiz() {
  /**
   * Hook responsável pelo gerenciamento do tema.
   *
   * colorScheme: informa o tema atual (light ou dark).
   * setColorScheme: permite definir o tema utilizado.
   */
  const { colorScheme, setColorScheme } = useColorScheme();

  // Seleciona as cores de navegação conforme o tema atual.
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  /**
   * useEffect executa um efeito após a montagem do componente.
   *
   * Na abertura, o hook já segue o tema do sistema, mas no navegador
   * as classes dark: só ligam depois de um setColorScheme.
   *
   * O operador ?? utiliza "light" caso colorScheme seja null
   * ou undefined.
   *
   * O array vazio [] indica que o efeito será executado
   * na montagem do componente, sem repetir a cada renderização.
   */
  useEffect(() => {
    setColorScheme(colorScheme ?? "light");
  }, []);

  return (
    <>
      {/*
        Stack principal responsável por organizar a navegação
        entre os diferentes grupos e telas do aplicativo.
      */}
      <Stack
        screenOptions={{
          // Define a cor de fundo do cabeçalho.
          headerStyle: {
            backgroundColor: cores.fundo,
          },

          // Define a cor dos elementos de navegação do cabeçalho.
          headerTintColor: cores.destaque,

          // Define a cor do título exibido no cabeçalho.
          headerTitleStyle: {
            color: cores.texto,
          },

          // Define o fundo das telas conforme o tema.
          contentStyle: {
            backgroundColor: cores.fundo,
          },
        }}
      >
        {/* Grupo responsável pelas abas Catálogo e Favoritos. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Grupo de autenticação, sem o cabeçalho da pilha. */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Rota dinâmica responsável pelos detalhes de um produto. */}
        <Stack.Screen
          name="produto/[id]"
          options={{ title: "Detalhe do produto" }}
        />
      </Stack>

      {/*
        Configura a aparência dos elementos da barra de status.

        No tema escuro, utiliza elementos claros.
        No tema claro, utiliza elementos escuros.
      */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}

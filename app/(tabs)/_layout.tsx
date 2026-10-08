/**
 * Layout responsável pela navegação entre as abas do aplicativo.
 *
 * Utiliza o Tabs do Expo Router para organizar as telas de
 * Catálogo e Favoritos, exibindo uma barra de navegação inferior.
 *
 * Funcionalidades:
 * - Configurar as abas e seus respectivos ícones.
 * - Aplicar as cores conforme o tema claro ou escuro.
 * - Exibir o botão de alternância de tema no cabeçalho.
 * - Personalizar a aparência da barra de navegação e das telas.
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { BotaoTema } from "@/components/BotaoTema";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutAbas() {
  // Identifica o tema atual da aplicação.
  const { colorScheme } = useColorScheme();

  // Seleciona as cores correspondentes ao tema ativo.
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Tabs
      screenOptions={{
        // Define as cores dos ícones e textos das abas.
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.inativo,

        // Personaliza o fundo e a borda superior da barra de abas.
        tabBarStyle: {
          backgroundColor: cores.fundo,
          borderTopColor: cores.borda,
        },

        // Configura a aparência do cabeçalho.
        headerStyle: {
          backgroundColor: cores.fundo,
        },
        headerTintColor: cores.texto,

        // Adiciona o botão de alternância de tema ao cabeçalho.
        headerRight: () => <BotaoTema />,

        // Define o fundo das telas conforme o tema selecionado.
        sceneStyle: {
          backgroundColor: cores.fundo,
        },
      }}
    >
      {/* Configura a aba principal do catálogo de produtos. */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Catálogo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Configura a aba de favoritos com um ícone de estrela. */}
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

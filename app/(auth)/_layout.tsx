/**
 * Layout responsável pelas telas de autenticação (Login e Cadastro).
 *
 * Utiliza o Stack do Expo Router para organizar a navegação entre as telas.
 * Também identifica o tema atual (claro ou escuro) para aplicar as cores
 * correspondentes e ocultar o cabeçalho padrão de navegação.
 */

import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

export default function LayoutAutenticacao() {
  // Identifica se o tema atual da aplicação é claro ou escuro.
  const { colorScheme } = useColorScheme();

  // Seleciona as cores correspondentes ao tema atual.
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Stack
      screenOptions={{
        // Oculta o cabeçalho padrão nas telas de autenticação.
        headerShown: false,

        // Define a cor de fundo das telas conforme o tema selecionado.
        contentStyle: {
          backgroundColor: cores.fundo,
        },
      }}
    />
  );
}

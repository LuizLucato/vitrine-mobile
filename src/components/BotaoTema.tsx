/**
 * Componente responsável por alternar o tema da aplicação.
 *
 * Utiliza o NativeWind para identificar e modificar o tema atual,
 * exibindo um ícone diferente conforme o tema selecionado.
 *
 * Conceitos utilizados:
 * - useColorScheme: identifica e controla o tema da aplicação.
 * - Pressable: permite executar uma ação ao pressionar o botão.
 * - Renderização condicional: altera o ícone e sua cor conforme o tema.
 */

import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

export function BotaoTema() {
  // Recupera o tema atual e a função responsável por alterná-lo.
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      // Alterna entre os temas claro e escuro ao pressionar o botão.
      onPress={toggleColorScheme}
      accessibilityRole="button"
      accessibilityLabel="Alternar tema claro e escuro"
      className="min-w-[44px] min-h-[44px] items-center justify-center mr-2 active:opacity-60"
    >
      <Ionicons
        // Exibe o sol no tema escuro e a lua no tema claro.
        name={colorScheme === "dark" ? "sunny-outline" : "moon-outline"}
        size={22}
        color={colorScheme === "dark" ? "#61DAFB" : "#0369A1"}
      />
    </Pressable>
  );
}

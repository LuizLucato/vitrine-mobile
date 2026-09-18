import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

export function BotaoTema() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      accessibilityRole="button"
      accessibilityLabel="Alternar tema claro e escuro"
      className="min-w-[44px] min-h-[44px] items-center justify-center mr-2 active:opacity-60"
    >
      <Ionicons
        name={colorScheme === "dark" ? "sunny-outline" : "moon-outline"}
        size={22}
        color={colorScheme === "dark" ? "#61DAFB" : "#0369A1"}
      />
    </Pressable>
  );
}

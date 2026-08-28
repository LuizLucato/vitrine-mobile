import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CORES } from "@/constants/tema";
import { CardProduto } from "@/components/CardProduto";
import { Produto } from "@/types/produto";

const EXEMPLO: Produto = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description: "Rímel de grande volume",
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  stock: 5,
  brand: "Essence",
  category: "beauty",
  thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
  images: [],
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <Text style={styles.marca}>Vitrine</Text>
        <CardProduto produto={EXEMPLO} destaque />
        <CardProduto produto={{ ...EXEMPLO, id: 2, title: "Segundo item" }} />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1B33",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { color: "#611DAFB", fontSize: 34, fontWeight: "bold" },
  subtitulo: { color: "#FFFFFF", fontSize: 15, marginTop: 8 },
  tela: { flex: 1, backgroundColor: CORES.fundo, padding: 16, paddingTop: 60 },
  marca: {
    color: CORES.destaque,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vitrine</Text>
      <Text style={styles.subtitulo}>
        Luiz Francisco - Dispostivos Móveis 2026
        </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1B33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { color: '#611DAFB', fontSize: 34, fontWeight: 'bold',},
  subtitulo: { color: '#FFFFFF', fontSize: 15, marginTop: 8},
});

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello World! 👋</Text>
        <Text style={styles.subtitle}>
          Our University Project CI/CD pipeline is officially live.
        </Text>
        <Text style={styles.teamTag}>Built by the Windows & Mac Team</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1f36',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4f566b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  teamTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#635bff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
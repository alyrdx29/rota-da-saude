import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.headerTitle}>Rota da Saúde</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Card de boas-vindas */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            Como podemos ajudar?
          </Text>

          <Text style={styles.welcomeText}>
            Encontre orientação, converse com nossa equipe e acompanhe
            sua jornada de cuidado.
          </Text>
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Acesso rápido</Text>

        {/* Triagem IA */}
        <TouchableOpacity
          style={styles.mainCard}
          onPress={() => navigation.navigate('ChatAI')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🤖</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Triagem rápida
            </Text>

            <Text style={styles.cardDescription}>
              Converse com nosso assistente virtual e receba
              orientações iniciais.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Chat profissional */}
        <TouchableOpacity
          style={styles.mainCard}
          onPress={() => navigation.navigate('NurseChat')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💬</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Falar com a equipe
            </Text>

            <Text style={styles.cardDescription}>
              Tire dúvidas diretamente com um profissional de saúde.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Informação */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Importante
            </Text>

            <Text style={styles.infoText}>
              O Rota da Saúde oferece orientações e triagem inicial.
              Em situações de emergência, procure atendimento médico
              imediatamente.
            </Text>
          </View>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Rota da Saúde • Cuidado que acompanha você
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF8',
  },

  scroll: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    fontSize: 15,
    color: '#6B7C77',
    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#183B35',
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DDEFE9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    fontSize: 22,
  },

  welcomeCard: {
    backgroundColor: '#2E8B72',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  welcomeText: {
    color: '#EAF7F2',
    fontSize: 14,
    lineHeight: 21,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#183B35',
    marginBottom: 14,
  },

  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0ECE8',
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 25,
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#183B35',
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 13,
    color: '#6B7C77',
    lineHeight: 18,
  },

  arrow: {
    fontSize: 30,
    color: '#2E8B72',
  },

  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E8',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },

  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5F4B18',
    marginBottom: 4,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#75642E',
  },

  footer: {
    textAlign: 'center',
    color: '#9AA8A4',
    fontSize: 12,
    marginTop: 28,
  },
});
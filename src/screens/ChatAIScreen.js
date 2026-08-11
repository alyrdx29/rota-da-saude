import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function ChatAIScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Eu sou o assistente do Rota da Saúde. 👋',
      sender: 'ai',
    },
    {
      id: 2,
      text: 'Posso fazer uma triagem inicial com base nos sintomas que você relatar. Como posso ajudar?',
      sender: 'ai',
    },
  ]);

  function sendMessage() {
    if (!message.trim()) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: 'user',
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ]);

    setMessage('');

    // A conexão com a IA será adicionada depois.
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiAvatarText}>🤖</Text>
          </View>

          <View>
            <Text style={styles.headerTitle}>
              Triagem Rápida
            </Text>

            <Text style={styles.headerSubtitle}>
              Assistente virtual
            </Text>
          </View>
        </View>
      </View>

      {/* Aviso */}
      <View style={styles.warning}>
        <Text style={styles.warningIcon}>ℹ️</Text>

        <Text style={styles.warningText}>
          Esta ferramenta oferece apenas uma orientação inicial e
          não substitui uma avaliação feita por um profissional de
          saúde.
        </Text>
      </View>

      {/* Mensagens */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageBubble,
              item.sender === 'user'
                ? styles.userBubble
                : styles.aiBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === 'user'
                  ? styles.userMessageText
                  : styles.aiMessageText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Campo de mensagem */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Descreva seus sintomas..."
          placeholderTextColor="#8B9995"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF8',
  },

  header: {
    height: 85,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECE8',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 35,
    color: '#2E8B72',
    lineHeight: 35,
  },

  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },

  aiAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  aiAvatarText: {
    fontSize: 22,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#183B35',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#6B7C77',
    marginTop: 2,
  },

  warning: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E8',
    margin: 12,
    padding: 12,
    borderRadius: 12,
  },

  warningIcon: {
    fontSize: 17,
    marginRight: 8,
  },

  warningText: {
    flex: 1,
    color: '#75642E',
    fontSize: 11,
    lineHeight: 16,
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 17,
    marginBottom: 10,
  },

  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E8B72',
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  aiMessageText: {
    color: '#29443E',
  },

  userMessageText: {
    color: '#FFFFFF',
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E1ECE8',
  },

  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    backgroundColor: '#F1F6F4',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#183B35',
    marginRight: 8,
  },

  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#2E8B72',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: '#B8CCC6',
  },

  sendText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
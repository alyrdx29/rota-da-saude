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

export default function NurseChatScreen({ navigation }) {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! 👋 Seja bem-vindo ao canal de suporte do Rota da Saúde.',
      sender: 'professional',
      time: 'Agora',
    },
    {
      id: 2,
      text: 'Como podemos ajudar você?',
      sender: 'professional',
      time: 'Agora',
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
      time: 'Agora',
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ]);

    setMessage('');
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

        <View style={styles.professionalAvatar}>
          <Text style={styles.avatarText}>👩‍⚕️</Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            Equipe de Saúde
          </Text>

          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              Canal de suporte
            </Text>
          </View>
        </View>
      </View>

      {/* Informação */}
      <View style={styles.infoBar}>
        <Text style={styles.infoIcon}>🔒</Text>

        <Text style={styles.infoText}>
          Este canal é destinado a dúvidas e orientações com a
          equipe de cuidado.
        </Text>
      </View>

      {/* Mensagens */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => {
          const isUser = item.sender === 'user';

          return (
            <View
              key={item.id}
              style={[
                styles.messageWrapper,
                isUser
                  ? styles.userWrapper
                  : styles.professionalWrapper,
              ]}
            >
              {!isUser && (
                <View style={styles.smallAvatar}>
                  <Text style={styles.smallAvatarText}>
                    👩‍⚕️
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  isUser
                    ? styles.userBubble
                    : styles.professionalBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isUser
                      ? styles.userMessageText
                      : styles.professionalMessageText,
                  ]}
                >
                  {item.text}
                </Text>

                <Text
                  style={[
                    styles.timeText,
                    isUser
                      ? styles.userTime
                      : styles.professionalTime,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Campo de mensagem */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
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
    height: 88,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECE8',
  },

  backButton: {
    width: 38,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 35,
    color: '#2E8B72',
  },

  professionalAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 11,
  },

  avatarText: {
    fontSize: 22,
  },

  headerInfo: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#183B35',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    color: '#6B7C77',
  },

  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF5F1',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    color: '#52736A',
    lineHeight: 16,
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },

  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },

  userWrapper: {
    justifyContent: 'flex-end',
  },

  professionalWrapper: {
    justifyContent: 'flex-start',
  },

  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E6F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  smallAvatarText: {
    fontSize: 14,
  },

  messageBubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 17,
  },

  professionalBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    backgroundColor: '#2E8B72',
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  professionalMessageText: {
    color: '#29443E',
  },

  userMessageText: {
    color: '#FFFFFF',
  },

  timeText: {
    fontSize: 9,
    marginTop: 4,
  },

  professionalTime: {
    color: '#9AA8A4',
  },

  userTime: {
    color: '#D5EEE7',
    textAlign: 'right',
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
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
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../supabaseClient';

const ai = new GoogleGenAI({ apiKey: 'AQ.AbBRN6LbPH9Qc1mhhg6XRN0r9vKabmFbV-QXjXy75LMRAf6v1w' });

export default function ChatAIScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Eu sou o assistente do Rota da Saúde. 🩺',
      sender: 'ai',
    },
    {
      id: 2,
      text: 'Posso fazer uma triagem inicial com base nos sintomas que você relatar. Como posso ajudar?',
      sender: 'ai',
    },
  ]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessageText = message.trim();

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userMessageText, sender: 'user' },
    ]);
    setMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('messages').insert([
        { user_id: user.id, text: userMessageText, sender: 'user' },
      ]);
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessageText,
        config: {
          systemInstruction:
            'Você é o assistente virtual do Rota da Saúde. Faça triagens virtuais com empatia e clareza, avisando sempre que não substitui uma consulta médica.',
        },
      });

      const aiReplyText = response.text;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiReplyText, sender: 'ai' },
      ]);

      if (user) {
        await supabase.from('messages').insert([
          { user_id: user.id, text: aiReplyText, sender: 'ai' },
        ]);
      }
    } catch (error) {
      console.error('Erro ao gerar resposta da IA:', error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
            <Text style={styles.headerTitle}>Triagem Rápida</Text>
            <Text style={styles.headerSubtitle}>Assistente virtual</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoBar}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          Esta ferramenta oferece apenas uma orientação inicial e não substitui
          uma avaliação feita por um profissional de saúde.
        </Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((item) => {
          const isUser = item.sender === 'user';
          return (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                isUser ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isUser ? styles.userMessageText : styles.aiMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descreva seus sintomas..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 28,
    color: '#0D5C3A',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  aiAvatarText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#718096',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFCBF',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: '#744210',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0D5C3A',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#2D3748',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0D5C3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
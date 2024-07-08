import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JournalCardProps {
  title: string;
  content: string;
}

const JournalCard: React.FC<JournalCardProps> = ({ title, content }) => {
  return (
    <View style={styles.card}>
        <Stack.Screen
        options={{
          title: "Journal card",
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default JournalCard;

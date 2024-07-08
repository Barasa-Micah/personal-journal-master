import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stack } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  JournalEntry: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "JournalEntry">;

const JournalEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSave = async () => {
    const response = await mockApiCall({ title, content, category });
    if (response.success) {
      Alert.alert("Save Successful", "Your journal entry has been saved.");
      // Navigating back to the home screen or another appropriate screen
      navigation.navigate("Home");
    } else {
      Alert.alert(
        "Save Failed",
        "There was an error saving your journal entry."
      );
    }
  };

  const mockApiCall = (entry: {
    title: string;
    content: string;
    category: string;
  }) => {
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        if (entry.title && entry.content && entry.category) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "New Journal Entry",
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Save" onPress={handleSave} color="#008899" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default JournalEntryScreen;

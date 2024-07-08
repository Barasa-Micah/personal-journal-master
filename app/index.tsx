import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  NewEntry: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface JournalEntry {
  id: string;
  title: string;
  summary: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const response = await mockApiCall();
      setEntries(response.entries);
    } catch (error) {
      Alert.alert("Error", "Failed to load journal entries.");
    } finally {
      setLoading(false);
    }
  };

  const mockApiCall = (): Promise<{ entries: JournalEntry[] }> => {
    // This is a mock function to simulate fetching journal entries
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          entries: [
            { id: "1", title: "Entry 1", summary: "Summary of entry 1" },
            { id: "2", title: "Entry 2", summary: "Summary of entry 2" },
            // Add more entries as needed
          ],
        });
      }, 1000);
    });
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entry}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entrySummary}>{item.summary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Journal</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No journal entries found.</Text>}
        />
      )}
      <View style={styles.nav}>
        <RenderLink href="/entry" title="Add Entry" />
        <RenderLink href="/settings" title="Settings" />
        <RenderLink href="/login" title="Login" />
        <RenderLink href="/journal" title="Journal" />
        <RenderLink href="/listscreen" title="Lists" />

        <RenderLink href="/signup" title="signup" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  entry: {
    padding: 16,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  entrySummary: {
    fontSize: 14,
    color: "gray",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    padding: 16,
    borderBottomColor: "gray",
    gap: 16,
  },
});

export default HomeScreen;

interface RenderLinkProps {
  href: string;
  title: string;
}

const RenderLink: React.FC<RenderLinkProps> = ({ href, title }) => {
  return (
    <Link href={href} asChild>
      <Button title={title} color="#008899" />
    </Link>
  );
};

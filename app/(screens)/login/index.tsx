import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stack } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    // Replace this with your actual login logic
    const response = await mockApiCall(email, password);
    if (response.success) {
      Alert.alert("Login Successful", "You have successfully logged in!");
      // Navigate to the home screen or another screen upon successful login
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  const mockApiCall = (email: string, password: string) => {
    // This is a mock function to simulate an API call
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        if (email === "micadevelops@gmail.com" && password === "1234") {
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
          title: "Login",
        }}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color="#008899"/>
      <Text>Don't have an account?</Text>
      <Button title="Sign Up" color="#008899" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    gap: 16,
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

export default LoginScreen;

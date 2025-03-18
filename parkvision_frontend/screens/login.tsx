import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createThirdwebClient } from "thirdweb";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App"; // Adjust path as needed

// actual Thirdweb client ID
const clientId = "0x88477BF8619d59934eE3a456a40580074ff45d22L2a9YMuJVEtbIW4SmITJ1E7a4W-y_vAAQbA_5HXHOiuir7xk9blpEnVdb24JO_ATK1UxwUt8LHfMmdSGObA4Ow";
// Create Thirdweb client instance
const client = createThirdwebClient({ clientId });
// Create wallet instance (using MetaMask's wallet id)
const wallet = createWallet("io.metamask");

// Define a type for navigation prop
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      // Check if an injected wallet (like MetaMask) is available
      if (injectedProvider("io.metamask")) {
        await wallet.connect({ client });
      } else {
        // Otherwise, open WalletConnect modal
        await wallet.connect({
          client,
          walletConnect: { showQrModal: true },
        });
      }
      // Navigate to HomeScreen by passing a string, not an array
      navigation.navigate("Home");
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login with Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1B22",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00CB6B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
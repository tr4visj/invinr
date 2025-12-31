import { supabase } from "@/services/supabase";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Sign in failed", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginVertical: 250 }}>
          <Image
            source={require("@assets/images/invindarktransp.png")}
            style={{ width: 160, height: 110 }}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              paddingHorizontal: 12,
              marginBottom: 12,
            }}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              paddingHorizontal: 12,
              marginBottom: 20,
            }}
          />

          <Pressable
            onPress={handleSignIn}
            disabled={loading}
            style={{
              height: 48,
              backgroundColor: loading ? "#999" : "#000",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </Pressable>
          <Pressable>
            <Text
              style={{
                color: "#777777",
                fontSize: 16,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              Forgot your password?
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

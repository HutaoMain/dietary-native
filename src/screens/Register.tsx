import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/Types";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const auth = FIREBASE_AUTH;

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Alert.alert("Password do not match");
      }

      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert("Successfully Registered your account");
      setLoading(false);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.registerContainer}>
          <Text>Already have an account? </Text>
          <Text style={styles.registerText} onPress={handleGoBackToLogin}>
            Login
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <LinearGradient
          colors={["#FFAA21", "#FFC42C"]}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={styles.buttonText}>
            {loading ? "Please wait..." : "Sign Up"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "90%",
          flexWrap: "wrap",
          paddingTop: 15,
        }}
      >
        <Text>
          By signing up, you are agreeing to our{" "}
          <Text style={{ color: "#64BCFC" }}>Terms of Service</Text> and{" "}
          <Text style={{ color: "#64BCFC" }}>Privacy Policy</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 100,
  },
  textContainer: {
    alignItems: "flex-start",
    width: "90%",
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#4D5C7E",
  },
  registerContainer: {
    flexDirection: "row",
    width: "90%",
  },
  registerText: {
    textDecorationLine: "underline",
    color: "#FD9206",
  },
  inputContainer: {
    width: "90%",
    backgroundColor: "#F4F7FF",
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
  },
  input: {
    width: "80%",
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/Types";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result.assets?.[0].base64}`;
      setImageBase64(base64Img);
    }
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const auth = FIREBASE_AUTH;

  const usersCollectionRef = collection(FIRESTORE_DB, "users");

  useEffect(() => {
    if (imageBase64) {
      let data = {
        file: imageBase64,
        upload_preset: "upload",
      };

      fetch("https://api.cloudinary.com/v1_1/alialcantara/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          console.log(data.secure_url);
          setImageUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  }, [imageBase64]);

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Alert.alert("Password do not match");
      }

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      await sendEmailVerification(user);

      await addDoc(usersCollectionRef, {
        email: email,
        fullName: name,
        dateOfBirth: dateOfBirth,
        imageUrl: imageUrl,
      });

      Alert.alert("Please check your email for verification.");
      setLoading(false);
      setImageBase64("");
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

  const disabled = !imageUrl && !email && !name && !password;

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
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: 22 }}>
          <Text style={{ textAlign: "left" }}>Date of Birth</Text>
        </View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.inputContainer}
        >
          <Fontisto name="date" size={24} color="black" />
          <Text style={styles.input}>
            {moment(dateOfBirth).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>
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

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Text>
            {imageUrl
              ? "Image picked successfully"
              : "Pick an image from camera roll"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={disabled ? styles.disabledButton : styles.button}
        onPress={handleRegistration}
        disabled={disabled}
      >
        <LinearGradient
          colors={disabled ? ["#dddddd", "#dddddd"] : ["#FFAA21", "#FFC42C"]}
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
    paddingTop: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    width: "90%",
    marginBottom: 10,
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
    marginTop: 10,
  },
  disabledButton: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});

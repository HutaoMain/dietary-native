import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../types/Types";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeSelectedDate = (selectedDate: any) => {
    const formattedDate = new Date(selectedDate);
    setShowDatePicker(false);
    if (formattedDate) {
      setDate(formattedDate);
    }
  };

  const toggleDate = () => {
    setShowDatePicker(true);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Alert.alert("Password do not match");
      }

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

  console.log(date);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <View style={styles.input_container}>
        <Text style={styles.input_label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.input_container}>
        <Text style={styles.input_label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.input_container}>
        <Text style={styles.input_label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.input_container}>
        <Text style={styles.input_label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.input_container}>
        <Text style={styles.input_label}>Birthday:</Text>
        <TouchableOpacity style={styles.input} onPress={toggleDate}>
          <Text>{moment(date).format("YYYY-MM-DD")}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          display="spinner"
          value={date}
          mode="date"
          onChange={(e) => onChangeSelectedDate(e.nativeEvent.timestamp)}
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          email && name && password && confirmPassword
            ? styles.buttonEnabled
            : styles.buttonDisabled,
        ]}
        onPress={handleRegistration}
        disabled={!email || !name || !password || !confirmPassword}
      >
        <Text style={styles.buttonText}>
          {loading ? "Please wait..." : "Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoBackToLogin}>
        <Text style={styles.buttonGoBack}>Go back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5D5D5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input_container: {
    width: "90%",
  },
  input_label: {
    paddingLeft: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 13,
    marginBottom: 10,
    marginTop: 3,
  },
  button: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: "#E44203",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
  buttonGoBack: {
    color: "black",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
});

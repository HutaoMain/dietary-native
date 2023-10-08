import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onSelectGender: (gender: string) => void;
}

const GenderSelect = ({ onSelectGender }: Props) => {
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    onSelectGender(gender);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40,
        marginBottom: 20,
        width: "100%",
        height: "20%",
      }}
    >
      <TouchableOpacity
        style={[
          {
            width: "45%",
            height: "100%",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          },
          selectedGender === "male" && { backgroundColor: "#E44203" },
        ]}
        onPress={() => handleGenderSelect("male")}
      >
        <Ionicons
          name="male"
          size={60}
          style={[
            { color: "black" },
            selectedGender === "male" && { color: "white" },
          ]}
        />
        <Text
          style={[
            { fontSize: 20, color: "black" },
            selectedGender === "male" && { color: "white" },
          ]}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          {
            width: "45%",
            height: "100%",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          },
          selectedGender === "female" && { backgroundColor: "#E44203" },
        ]}
        onPress={() => handleGenderSelect("female")}
      >
        <Ionicons
          name="female"
          size={60}
          style={[
            { color: "black" },
            selectedGender === "female" && { color: "white" },
          ]}
        />
        <Text
          style={[
            { fontSize: 20, color: "black" },
            selectedGender === "female" && { color: "white" },
          ]}
        >
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelect;

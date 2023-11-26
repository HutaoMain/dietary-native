// AllergySelection.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import "firebase/firestore";

import useAuthStore from "../zustand/AuthStore";
import { LinearGradient } from "expo-linear-gradient";
import updateUserAllergies from "../CurrentAllergies";

interface Props {
  handleRegistration: () => void;
  loading: boolean;
}

const allergens: string[] = [
  "Milk",
  "Eggs",
  "Fish",
  "Crustacean shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
];

const RegisterAllergySelection = ({ handleRegistration, loading }: Props) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const toggleAllergy = async (allergen: string) => {
    // Update local state
    const updatedAllergies = selectedAllergies.includes(allergen)
      ? selectedAllergies.filter((a) => a !== allergen)
      : [...selectedAllergies, allergen];
    setSelectedAllergies(updatedAllergies);

    // Update Firebase
    try {
      handleRegistration();
      await updateUserAllergies(user || "", updatedAllergies);
    } catch (error) {
      console.error("Error updating user allergies:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Allergies:</Text>
        <View style={styles.allergenContainer}>
          {allergens.map((allergen) => (
            <TouchableOpacity
              key={allergen}
              style={[
                styles.allergenButton,
                selectedAllergies.includes(allergen) && styles.selectedAllergen,
              ]}
              onPress={() => toggleAllergy(allergen)}
            >
              <Text style={styles.allergenText}>{allergen}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 120,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={
            // disabled ? styles.disabledButton :
            styles.button
          }
          onPress={handleRegistration}
          // disabled={disabled}
        >
          <LinearGradient
            colors={
              //   disabled ? ["#dddddd", "#dddddd"] :
              ["#FFAA21", "#FFC42C"]
            }
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
            paddingHorizontal: 5,
          }}
        >
          <Text>
            By signing up, you are agreeing to our{" "}
            <Text style={{ color: "#64BCFC" }}>Terms of Service</Text> and{" "}
            <Text style={{ color: "#64BCFC" }}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  allergenContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  allergenButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  selectedAllergen: {
    backgroundColor: "#64b5f6",
  },
  allergenText: {
    fontSize: 14,
  },
  button: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterAllergySelection;

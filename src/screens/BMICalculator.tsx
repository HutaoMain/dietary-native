import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GenderSelect from "../components/GenderSelect";
import SliderInput from "../components/SliderInput";
import CounterInput from "../components/CounterInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BMINavigationProps } from "../types/Types";

const BMICalculator = () => {
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<number>(160);
  const [weight, setWeight] = useState<number>(60);
  const [age, setAge] = useState(25);
  const [bmiResult, setBMIResult] = useState<number>(0);

  const navigate = useNavigation<BMINavigationProps["navigation"]>();

  useEffect(() => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const finalBmi = Math.round(bmi * 1e2) / 1e2;
    setBMIResult(finalBmi);
  });

  console.log(bmiResult);

  const handleSubmitBmiResult = () => {
    let bmiCategory = "";
    if (bmiResult < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiResult >= 18.5 && bmiResult < 24.9) {
      bmiCategory = "Normal";
    } else if (bmiResult >= 25 && bmiResult < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    navigate.navigate("BMIResult", {
      gender: gender,
      height: height,
      weight: weight,
      age: age,
      bmiResult: bmiResult,
      bmiCategory: bmiCategory,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#D5D5D5",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <GenderSelect
        onSelectGender={(selectedGender: string) => setGender(selectedGender)}
      />
      <SliderInput
        label="Height (cm)"
        value={height}
        min={100}
        max={250}
        step={1}
        onValueChange={(value: number) => setHeight(value)}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <CounterInput
          label="Weight (kg)"
          value={weight}
          onIncrement={() => setWeight((prevWeight) => prevWeight + 1)}
          onDecrement={() => setWeight((prevWeight) => prevWeight - 1)}
        />
        <CounterInput
          label="Age"
          value={age}
          onIncrement={() => setAge((prevAge) => prevAge + 1)}
          onDecrement={() => setAge((prevAge) => prevAge - 1)}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 20,
          width: "95%",
          borderWidth: 1,
          borderColor: "black",
        }}
        onPress={handleSubmitBmiResult}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Calculate BMI
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BMICalculator;
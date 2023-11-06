import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IMealPlan, MealPlanNavigationProps } from "../types/Types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  mealPlan: IMealPlan;
}

const MealPlanCard = ({ mealPlan }: Props) => {
  const navigation = useNavigation<MealPlanNavigationProps["navigation"]>();

  const handleNavigate = () => {
    navigation.navigate("MealPlanSingleScreen", {
      _id: mealPlan._id,
      name: mealPlan.name,
      image: mealPlan.image,
      calories: mealPlan.calories,
      description: mealPlan.description,
      ingredients: mealPlan.ingredients,
      mealType: mealPlan.mealType,
      bmiRange: {
        min: mealPlan.bmiRange.min,
        max: mealPlan.bmiRange.max,
      },
      createdAt: mealPlan.createdAt,
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "black",
        height: 65,
        marginBottom: 3,
        marginTop: 5,
      }}
      onPress={handleNavigate}
    >
      <View style={{ paddingLeft: 10, flexWrap: "wrap", width: "70%" }}>
        <Text style={{ paddingLeft: 5, flexWrap: "wrap", width: "100%" }}>
          {mealPlan.name}
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          backgroundColor: "#73A065",
          alignItems: "center",
          justifyContent: "center",
          height: 65,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {mealPlan.calories}
        </Text>
        <Text style={{ color: "white" }}>Calories</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealPlanCard;

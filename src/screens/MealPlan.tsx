import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { IMealPlan } from "../types/Types";
import MealPlanCard from "../components/MealPlanCard";
import { mealPlanData } from "../MealPlanData";
import useFetchCurrentBmiData from "../CurrentBmiResult";

const MealPlan = () => {
  type GroupedDays = { [day: number]: IMealPlan[] };

  const bmiResultData = useFetchCurrentBmiData();

  const groupMealPlansByDay = () => {
    const groupedDays: GroupedDays = {};

    mealPlanData?.forEach((mealPlan, index) => {
      const dayOfWeek = index % 7;
      if (!groupedDays[dayOfWeek]) {
        groupedDays[dayOfWeek] = [];
      }

      // Check if bmiResult is within the range for the current meal plan
      const isInBmiRange =
        bmiResultData &&
        bmiResultData.bmiResult >= mealPlan.bmiRange.min &&
        bmiResultData.bmiResult <= mealPlan.bmiRange.max;

      // If it's in range or bmiResultData is not available, include the meal plan
      if (isInBmiRange || !bmiResultData) {
        groupedDays[dayOfWeek].push(mealPlan);
      }
    });

    return groupedDays;
  };

  const daysWithMealPlans = groupMealPlansByDay();

  console.log(
    mealPlanData?.map((item) => {
      item.name, console.log(item.name);
    })
  );

  return (
    <View>
      <ScrollView>
        {Object.keys(daysWithMealPlans).map((day, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text>{getDayName(parseInt(day))}</Text>
            {daysWithMealPlans[parseInt(day)].map((mealPlan, key) => (
              <MealPlanCard mealPlan={mealPlan} key={key} />
            ))}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MealPlan;

const getDayName = (day: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};

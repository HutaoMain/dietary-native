import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
// { useEffect, useState }
// import axios from "axios";
// import { API_URL } from "../EnvironmentVariables";
import { IMealPlan } from "../types/Types";
import MealPlanCard from "../components/MealPlanCard";
import { mealPlanData } from "../MealPlanData";

const MealPlan = () => {
  //   const [mealPlanList, setMealPlanList] = useState<IMealPlan[]>();

  //   useEffect(() => {
  //     const fetch = async () => {
  //       try {
  //         const res = await axios.get(`${API_URL}/api/food`);

  //         setMealPlanList(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetch();
  //   }, []);

  type GroupedDays = { [day: number]: IMealPlan[] };

  // Function to group meal plans by day
  const groupMealPlansByDay = () => {
    const groupedDays: GroupedDays = {};

    // Group meal plans into days (you can adjust the logic as per your data)
    mealPlanData?.forEach((mealPlan, index) => {
      const dayOfWeek = index % 7; // Assuming there are 7 days in a week
      if (!groupedDays[dayOfWeek]) {
        groupedDays[dayOfWeek] = [];
      }
      groupedDays[dayOfWeek].push(mealPlan);
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

// Helper function to get the day name from day number (0-6)
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

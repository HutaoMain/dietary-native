import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BMICalculator from "../screens/BMICalculator";
import BMIResult from "../screens/BMIResult";
import { HomeNavigationStackProps } from "../types/Types";
import Home from "../screens/Home";
import Chat from "../components/Chat";
import Profile from "../screens/Profile";

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<HomeNavigationStackProps>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="BMICalculator" component={BMICalculator} />
      <HomeStack.Screen
        name="BMIResult"
        component={BMIResult}
        options={{ headerTitle: "BMI Result" }}
      />
      <HomeStack.Screen name="Chat" component={Chat} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;

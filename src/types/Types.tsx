import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};

export type HomeNavigationStackProps = {
  Home: undefined;
  BMICalculator: undefined;
  BMIResult: {
    gender: string;
    height: number;
    weight: number;
    age: number;
    bmiResult: number;
    bmiCategory: string;
  };
  Chat: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  "BMIResult"
>;

export type BMINavigationStackProps = {
  Home: undefined;
  BMICalculator: undefined;
  BMIResult: {
    gender: string;
    height: number;
    weight: number;
    age: number;
    bmiResult: number;
    bmiCategory: string;
  };
};

export type BMINavigationProps = NativeStackScreenProps<
  BMINavigationStackProps,
  "BMIResult"
>;

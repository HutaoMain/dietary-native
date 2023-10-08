import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
}

const SliderInput = ({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
}: Props) => {
  return (
    <View
      style={{
        marginBottom: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 5,
        height: "20%",
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
        {label}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          paddingTop: 10,
          paddingBottom: 5,
          color: "black",
        }}
      >
        {value}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="black"
        thumbTintColor="black"
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default SliderInput;

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.coverPhotoContainer}>
        <Image
          source={require("../../assets/user-logo.png")}
          style={styles.coverPhoto}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>28</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>70 kg</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>175 cm</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Birthday</Text>
            <Text style={styles.infoValue}>Jan 1, 1995</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI</Text>
            <Text style={styles.infoValue}>24.5</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>Male</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverPhotoContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    objectFit: "contain",
  },
  editButton: {
    position: "absolute",
    top: 160,
    right: 20,
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
  },
  infoColumn: {
    borderWidth: 1,
    borderColor: "black",
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Profile;

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  Alert,
  Button,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { GlobalColors } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { categories, transactions } from "./transactions";
import { ExpensesContext } from "../context/ExpensesContext";
import { useToast } from "react-native-toast-notifications";

const AddExpense = ({ route }) => {
  const navigation = useNavigation();
  const expensesContext = useContext(ExpensesContext);
  const [newExpense, setNewExpense] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const toast = useToast();

  function inputHandler(amount) {
    setNewExpense(amount);
  }

  function addExpense(amount) {
    transactions.map((item) => {
      if (item.name === selectedCategory) {
        item.addTransaction(amount);
      }
    });

    expensesContext.addExpense(parseFloat(amount));
    setTimeout(() => {
      navigation.goBack();
    }, 200);
    toast.show(`Added SAR ${amount} to ${selectedCategory}`, {
      type: "success",
    });
    // expensesContext.total + amount < route.params.budget
    //   ?
    //   : toast.show(`You've exceed your monthly budget!`, {
    //       type: "danger",
    //     });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons
            name="close-circle"
            color={GlobalColors.colors.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Add Expense</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#D0D0D0",
          borderRadius: 15,
          width: "80%",
          alignSelf: "center",
          marginTop: "8%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            paddingLeft: "5%",
            flex: 1,
          }}
        >
          SAR |
        </Text>
        <TextInput
          onChangeText={(value) => inputHandler(value)}
          keyboardType={"numeric"}
          style={{
            flex: 2,
            paddingVertical: 20,
            fontSize: 30,
            color: "white",
            textAlign: "left",
          }}
          placeholderTextColor={"#aaa"}
          placeholder={"20"}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: "5%" }}></View>}
          numColumns={4}
          data={transactions}
          keyExtractor={(item) => item.name}
          renderItem={({ index, item }) => {
            return (
              <Pressable
                onPress={() => {
                  setSelectedCategory(item.name);
                }}
                style={{
                  backgroundColor: "white",
                  height: 70,
                  width: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  marginRight: index == 3 || index === 7 ? 0 : "5%",
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={45}
                  color={
                    selectedCategory === item.name
                      ? item.color
                      : GlobalColors.colors.lightGray50
                  }
                />
              </Pressable>
            );
          }}
        />
      </View>
      <TouchableOpacity
        disabled={selectedCategory.length < 1 || newExpense < 1 ? true : false}
        style={[
          styles.addButton,
          selectedCategory.length < 1 || newExpense < 1
            ? { backgroundColor: "#D0D0D0" }
            : null,
        ]}
        onPress={() => addExpense(newExpense)}
      >
        <Text style={{ fontSize: 30, color: "white", textAlign: "center" }}>
          Add
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.extraLightGray,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
    color: GlobalColors.colors.primary,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: "5%",
  },
  categoriesContainer: {
    width: "100%",
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  categoryItem: {},
  addButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: GlobalColors.colors.primary,
    padding: 10,
    borderRadius: 10,
  },
});

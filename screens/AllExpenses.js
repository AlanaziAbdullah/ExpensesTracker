import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../styles";
import { categories, transactions } from "./transactions";
import { ExpensesContext } from "../context/ExpensesContext";
import { CategoryRow } from "../components/CategoryRow";

const AllExpenses = ({ navigation }) => {
  const expensesContext = useContext(ExpensesContext);
  const expenses = expensesContext.total;
  const [monthBudget, setMonthBudget] = useState(1000);
  const [percentage, setPercentage] = useState(100);
  const [expandView, setExpandView] = useState(false);
  const [editable, setEditable] = useState(false);
  const [filterUp, setAscending] = useState(true);

  const animate = useState(new Animated.Value(570))[0];

  function ascending(a, b) {
    if (a.totalSpent < b.totalSpent) {
      return -1;
    }
    if (a.totalSpent > b.totalSpent) {
      return 1;
    }
    return 0;
  }

  function descending(a, b) {
    if (a.totalSpent < b.totalSpent) {
      return 1;
    }
    if (a.totalSpent > b.totalSpent) {
      return -1;
    }
    return 0;
  }

  function sort() {
    setAscending(!filterUp);
    switch (filterUp) {
      case true:
        transactions.sort(ascending);
        break;
      case false:
        transactions.sort(descending);
        break;
    }
  }

  function setBudget(value) {
    setMonthBudget(parseFloat(value));
  }

  function expand() {
    setExpandView(!expandView);
  }

  function edit() {
    setEditable(!editable);
  }

  useEffect(() => {
    if (expandView) {
      Animated.spring(animate, {
        toValue: 950,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animate, {
        toValue: 570,
        useNativeDriver: false,
      }).start();
    }
  }, [expandView]);

  useEffect(() => {
    if (!editable) {
      expenses < monthBudget
        ? setPercentage(
            Math.floor(((monthBudget - expenses) / monthBudget) * 100)
          )
        : setPercentage(0);
    }
  }, [expenses, monthBudget, editable]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <Text
            style={{ color: "white", fontSize: 24, flex: 4, fontWeight: "400" }}
          >
            Expenses
          </Text>
          {/* <View style={styles.headerIcons}> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Add", { budget: monthBudget })}
          >
            <Ionicons name="add" size={30} color={"white"} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={25} color={"white"} />
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
        <View style={styles.expnsesView}>
          <View style={styles.monthRow}>
            <Ionicons
              name="chevron-back-circle-outline"
              size={30}
              color={"#fff"}
            />
            <View style={{ marginHorizontal: "13%", flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 18,
                  marginBottom: 20,
                }}
              >
                This Month
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SAR{" "}
                <Text
                  style={{
                    fontSize: 35,
                    color: expenses < monthBudget ? "#fff" : "#CE0000",
                    fontWeight: "bold",
                  }}
                >
                  {/*========= TOTAL =========*/}
                  {expenses}
                </Text>
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-circle-outline"
              size={30}
              color={"#fff"}
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.budgetView}>
        <View style={styles.budgetDetails}>
          <Text style={{ fontWeight: "600", marginRight: "4%" }}>
            Month Budget
          </Text>
          <Text style={{ color: "#aaa", fontWeight: "600" }}>SAR </Text>
          <TextInput
            editable={editable}
            keyboardType={"numeric"}
            onChangeText={setBudget}
            style={{
              color: editable ? null : "#aaa",
              fontWeight: "600",
              padding: 10,
              paddingLeft: 0,
            }}
          >
            {parseFloat(monthBudget)}
          </TextInput>
          <TouchableOpacity onPress={edit}>
            <Ionicons
              name={editable ? "checkmark-circle" : "create"}
              size={18}
              color={"gray"}
              style={{ marginLeft: 5, padding: 5 }}
            ></Ionicons>
          </TouchableOpacity>

          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: "600",
            }}
          >
            {percentage}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[styles.innerProgressBar, { width: `${percentage}%` }]}
          ></View>
        </View>
      </View>
      <Animated.View style={[styles.expensesView, { height: animate }]}>
        <View>
          <TouchableOpacity onPress={expand}>
            <Ionicons
              name={
                expandView
                  ? "arrow-down-circle-outline"
                  : "arrow-up-circle-outline"
              }
              color={GlobalColors.colors.gray}
              size={30}
              style={{ alignSelf: "center", marginBottom: "5%" }}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, flex: 1 }}>Expenses</Text>
            <TouchableOpacity onPress={sort}>
              <Ionicons
                name={filterUp ? "arrow-down" : "arrow-up"}
                size={23}
                color={"#aaa"}
              />
            </TouchableOpacity>

            {/* <Ionicons name="add" size={23} color={"#aaa"} /> */}
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={transactions}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ index, item }) => {
            return item.totalSpent > 0 ? (
              <CategoryRow
                expenses={expenses}
                index={index}
                item={item}
              ></CategoryRow>
            ) : (
              <></>
            );
          }}
        />
        <View style={{ height: "10%", backgroundColor: "red", width: "50%" }}>
          <Text>rrrr</Text>
        </View>
      </Animated.View>
    </>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: GlobalColors.colors.primary,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerIcons: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  monthRow: {
    paddingHorizontal: "5%",
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  expnsesView: {
    alignSelf: "center",
    justifyContent: "center",
    top: "10%",
    color: "white",
  },

  //============== BUDGET ==============//
  budgetView: {
    zIndex: 10,
    borderRadius: 60,
    position: "absolute",
    bottom: -20,
    width: "100%",
    height: "60%",
    backgroundColor: GlobalColors.colors.extraLightGray,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -8 },
  },
  budgetDetails: {
    flexDirection: "row",
    // backgroundColor: "red",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    alignItems: "center",
  },
  progressBar: {
    height: 16,
    borderRadius: 100,
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderColor: GlobalColors.colors.primary,
  },
  innerProgressBar: {
    height: 10,
    backgroundColor: GlobalColors.colors.primary,
    borderRadius: 100,
    alignSelf: "flext-start",
    // borderWidth: 1,
    // borderColor: "#088efa",
  },
  //============== EXPENSES ==============//
  expensesView: {
    zIndex: 15,
    borderRadius: 60,
    position: "absolute",
    bottom: -150,
    width: "100%",
    // height: "60%",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -8 },

    padding: "10%",
    paddingTop: "2%",
  },
});

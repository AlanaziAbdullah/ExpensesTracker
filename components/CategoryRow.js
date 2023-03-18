import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../styles";
import { transactions } from "../screens/transactions";

export function CategoryRow(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        marginBottom: props.index === transactions.length - 1 ? 100 : 0,
      }}
    >
      <View
        style={{
          backgroundColor: GlobalColors.colors.extraLightGray,
          padding: 10,
          borderRadius: 100,
          marginRight: 15,
        }}
      >
        <Ionicons name={props.item.icon} color={props.item.color} size={42} />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {props.item.name}
        </Text>
        <Text
          style={{
            color: GlobalColors.colors.lightGray,
          }}
        >
          {props.expenses - props.item.totalSpent > 0
            ? Math.floor((props.item.totalSpent / props.expenses) * 100) +
              "% of expenses"
            : "0% of expenses"}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "600",
            marginBottom: 8,
            textAlign: "right",
          }}
        >
          SAR {props.item.totalSpent}
        </Text>
        <Text
          style={{
            color: GlobalColors.colors.lightGray,
            textAlign: "right",
          }}
        >
          {props.item.transactions} transactions
        </Text>
      </View>
    </View>
  );
}

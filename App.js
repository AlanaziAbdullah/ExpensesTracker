import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import AllExpensesScreen from "./screens/AllExpenses";
import AddExpense from "./screens/AddExpense";
import ExpensesContextProvider from "./context/ExpensesContext";

import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <ToastProvider
          successIcon={
            <Ionicons name="checkmark-circle" color={"white"} size={25} />
          }
          dangerIcon={
            <Ionicons name="alert-circle" color={"white"} size={25} />
          }
        >
          <ExpensesContextProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Expenses"
                component={AllExpensesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Add"
                component={AddExpense}
                options={{ headerShown: false, presentation: "modal" }}
              />
            </Stack.Navigator>
          </ExpensesContextProvider>
        </ToastProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

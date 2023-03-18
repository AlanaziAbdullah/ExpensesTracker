import { ToastAndroid } from "react-native";

export class Category {
  constructor(name, icon, color, transactions, totalSpent) {
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.totalSpent = totalSpent;
    this.transactions = transactions;
  }

  addTransaction(amount) {
    this.transactions += 1;
    this.totalSpent += parseFloat(amount);
    // ToastAndroid.show(
    //   `${amount} has been added to ${this.name}`,
    //   ToastAndroid.SHORT
    // );
    // console.log(`A transaction of ${amount} has been added to ${this.name}`);
  }
}

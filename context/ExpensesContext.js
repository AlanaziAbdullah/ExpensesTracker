import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  total: 0,
  addExpense: (amount) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState(0);

  function addExpense(amout) {
    setExpenses((current) => current + amout);
  }

  const values = {
    total: expenses,
    addExpense: addExpense,
  };

  return (
    <ExpensesContext.Provider value={values}>
      {children}
    </ExpensesContext.Provider>
  );
}

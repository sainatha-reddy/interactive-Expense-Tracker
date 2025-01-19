import { Budget, Expense } from '@/types/expense';

const EXPENSES_KEY = 'expenses';
const BUDGET_KEY = 'budget';

export const storage = {
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveExpenses: (expenses: Expense[]) => {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  },

  getBudget: (): Budget | null => {
    const data = localStorage.getItem(BUDGET_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveBudget: (budget: Budget) => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  },
};
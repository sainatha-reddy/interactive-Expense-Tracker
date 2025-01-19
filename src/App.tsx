import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { BudgetForm } from '@/components/BudgetForm';
import { Dashboard } from '@/components/Dashboard';
import { Budget, Expense } from '@/types/expense';
import { storage } from '@/lib/storage';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  useEffect(() => {
    setExpenses(storage.getExpenses());
    setBudget(storage.getBudget());
  }, []);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
    setIsExpenseDialogOpen(false);
  };

  const handleEditExpense = (updatedExpense: Omit<Expense, 'id'>) => {
    if (!editingExpense) return;
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? { ...updatedExpense, id: expense.id }
        : expense
    );
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
    setEditingExpense(null);
    setIsExpenseDialogOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);
  };

  const handleSetBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    storage.saveBudget(newBudget);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your expenses and manage your budget efficiently
          </p>
        </header>

        <div className="mb-8 flex justify-center md:justify-start">
          <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg hover:shadow-primary/25">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </DialogTitle>
              </DialogHeader>
              <ExpenseForm
                onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
                initialExpense={editingExpense || undefined}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="dashboard" className="flex-1 md:flex-none">Dashboard</TabsTrigger>
            <TabsTrigger value="expenses" className="flex-1 md:flex-none">Expenses</TabsTrigger>
            <TabsTrigger value="budget" className="flex-1 md:flex-none">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard expenses={expenses} budget={budget} />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseList
              expenses={expenses}
              onEdit={(expense) => {
                setEditingExpense(expense);
                setIsExpenseDialogOpen(true);
              }}
              onDelete={handleDeleteExpense}
            />
          </TabsContent>

          <TabsContent value="budget">
            <div className="max-w-md mx-auto">
              <BudgetForm onSubmit={handleSetBudget} currentBudget={budget} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
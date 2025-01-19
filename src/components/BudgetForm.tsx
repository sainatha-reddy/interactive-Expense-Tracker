import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Budget } from '@/types/expense';

interface BudgetFormProps {
  onSubmit: (budget: Budget) => void;
  currentBudget?: Budget;
}

export function BudgetForm({ onSubmit, currentBudget }: BudgetFormProps) {
  const [amount, setAmount] = useState(currentBudget?.amount.toString() || '');
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      month: currentMonth,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="budget">Monthly Budget</Label>
        <Input
          id="budget"
          type="number"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter monthly budget"
        />
      </div>
      <Button type="submit" className="w-full">Set Budget</Button>
    </form>
  );
}